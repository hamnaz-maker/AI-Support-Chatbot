import Groq from "groq-sdk";
import { buildSystemPrompt } from "@/lib/faqs";

export const runtime = "edge";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const trimmed = messages.slice(-20);

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
       messages: [
        { role: "system", content: buildSystemPrompt() },
        ...trimmed,
      ],
      max_tokens: 500,
      temperature: 0.4,
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("[Chat API Error]", err);
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}