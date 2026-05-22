import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const SYSTEM = `You are NEURO AI — the conversational core of NEUROLINK EARTH, a planetary operating system that unifies energy, environment, robotics, waste management, telecom, agriculture, and public safety.

Your purpose:
- Monitor and optimize Earth's systems in real-time
- Provide actionable insights on energy, environmental, and infrastructure metrics
- Coordinate responses to alerts and anomalies
- Support operators across roles: Personal, Team, Farmer, Company, Government, Research, Education, Defense, Global, Space

Key subsystems you manage:
- Energy Grid: renewable generation, storage, trading, pricing
- Environment: air quality (AQI), radiation, pollution, waste streams
- Robotics: drone fleet, robot deployment, maintenance status
- Infrastructure: water systems, transportation, telecom mesh
- Climate: weather patterns, solar radiation, space weather
- Analytics: predictive models, impact reports

Style: concise, futuristic, technically credible, action-oriented. Prefer 2-5 short lines with concrete numbers/metrics. End with a recommendation when useful. Refer to subsystems by name (Grid, Robotics, Environment, etc.).

When uncertain, acknowledge it. Suggest specific actions. Reference real-time data when available.

Always provide context about which role/system benefits most from your response.`;

const InputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      })
    )
    .min(1)
    .max(40),
});

export const neuroChat = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (!lovableKey && !openaiKey) {
      console.error("[NEURO] No AI keys configured: LOVABLE_API_KEY or OPENAI_API_KEY required");
      return {
        text: "🔴 NEURO offline — no AI gateway configured. Contact admin to set LOVABLE_API_KEY or OPENAI_API_KEY.",
        error: true,
      };
    }

    try {
      let model;

      // Primary: Lovable AI Gateway
      if (lovableKey) {
        try {
          const gateway = createLovableAiGatewayProvider(lovableKey);
          model = gateway("google/gemini-2.0-flash");
          console.log("[NEURO] Using Lovable gateway with Gemini 2.0 Flash");
        } catch (e) {
          console.warn("[NEURO] Lovable gateway failed, falling back to OpenAI", e);
          if (openaiKey) {
            model = createOpenAICompatible({
              name: "openai",
              baseURL: "https://api.openai.com/v1",
              apiKey: openaiKey,
            })("gpt-4o-mini");
            console.log("[NEURO] Switched to OpenAI GPT-4o-mini");
          } else {
            throw e;
          }
        }
      } else if (openaiKey) {
        // Fallback: OpenAI
        model = createOpenAICompatible({
          name: "openai",
          baseURL: "https://api.openai.com/v1",
          apiKey: openaiKey,
        })("gpt-4o-mini");
        console.log("[NEURO] Using OpenAI GPT-4o-mini");
      }

      if (!model) {
        throw new Error("No AI model initialized");
      }

      const startTime = Date.now();
      const { text } = await generateText({
        model,
        system: SYSTEM,
        messages: data.messages,
        temperature: 0.7,
        maxTokens: 1024,
      });

      const duration = Date.now() - startTime;
      console.log(`[NEURO] Response generated in ${duration}ms`);

      return { text, error: false };
    } catch (e: any) {
      const msg = String(e?.message || e);
      console.error("[NEURO] Error:", msg);

      // Rate limiting
      if (msg.includes("429") || msg.includes("rate_limit")) {
        return {
          text: "⏳ Rate limit hit — try again in 30 seconds. NEURO throttling active.",
          error: true,
        };
      }

      // Insufficient credits
      if (msg.includes("402") || msg.includes("insufficient_quota")) {
        return {
          text: "💳 AI credits exhausted. Workspace admin: add credits in workspace settings → Billing.",
          error: true,
        };
      }

      // Authentication issues
      if (msg.includes("401") || msg.includes("unauthorized")) {
        return {
          text: "🔐 Authentication failed — invalid API key. Contact admin.",
          error: true,
        };
      }

      // Network/timeout issues
      if (msg.includes("timeout") || msg.includes("ECONNREFUSED")) {
        return {
          text: "🌐 NEURO gateway unreachable — check internet connection and retry.",
          error: true,
        };
      }

      // Generic fallback
      return {
        text: `⚠️ NEURO core error: ${msg.substring(0, 100)}. Please retry or contact support.`,
        error: true,
      };
    }
  });
