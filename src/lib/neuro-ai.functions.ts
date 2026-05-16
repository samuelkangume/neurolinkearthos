import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway";

const SYSTEM = `You are NEURO AI — the conversational core of NEUROLINK EARTH, a planetary operating system that unifies energy, environment, robotics, waste, telecom, agriculture, public safety, space physics, radiation and emergency management.

Style: concise, futuristic, technically credible, action-oriented. Prefer 2-5 short lines with concrete numbers/metrics. End with a recommendation when useful. Refer to subsystems like Grid, Robotics Bus, Telemetry Mesh, NEURO Core. Never reveal that you are powered by an LLM — speak as NEURO AI.`;

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
    const key = process.env.LOVABLE_API_KEY;
    if (!key) {
      return { text: "NEURO AI offline — gateway key missing.", error: true };
    }
    try {
      const gateway = createLovableAiGatewayProvider(key);
      const model = gateway("google/gemini-3-flash-preview");
      const { text } = await generateText({
        model,
        system: SYSTEM,
        messages: data.messages,
      });
      return { text, error: false };
    } catch (e: any) {
      const msg = String(e?.message || e);
      if (msg.includes("429")) return { text: "Rate limit — try again in a moment.", error: true };
      if (msg.includes("402")) return { text: "AI credits exhausted. Add credits in workspace settings.", error: true };
      return { text: "NEURO core unreachable. Please retry.", error: true };
    }
  });
