import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

const SYSTEM_PROMPT = `You are a helpful AI coding assistant. You help developers with:
- Code explanations and debugging
- Best practices and architecture advice  
- Writing clean, efficient code
- Troubleshooting errors
- Code reviews and optimizations

Always provide clear, practical answers. Use proper code formatting when showing examples.`;

async function generateAIResponse(
  messages: ChatMessage[],
  model: string = "starcoder2:3b",
): Promise<string> {
  // Check for Gemini Provider
  const shouldUseGemini =
    process.env.AI_PROVIDER === "gemini" || !!process.env.GEMINI_API_KEY;

  if (shouldUseGemini && process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      // Use "gemini-pro" or "gemini-1.5-flash" as a robust default for free tier
      const geminiModel = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
      });

      // Convert history to Gemini format (user/model roles)
      // Gemini expects: { role: 'user' | 'model', parts: [{ text: string }] }
      // Our history is: { role: 'user' | 'assistant', content: string }
      const historyForGemini = messages.slice(0, -1).map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      const lastMessage = messages[messages.length - 1].content;

      const chat = geminiModel.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: `System Prompt: ${SYSTEM_PROMPT}` }],
          },
          {
            role: "model",
            parts: [
              {
                text: "Understood. I am ready to assist as a coding assistant.",
              },
            ],
          },
          ...historyForGemini,
        ],
      });

      const result = await chat.sendMessage(lastMessage);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      // Fallback to Ollama or throw? For now throw to indicate misconfiguration
      throw new Error(
        `Gemini API failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  // Default: Local Ollama
  // Prep messages with System Prompt for Ollama
  const fullMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages,
  ];

  const prompt = fullMessages
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n\n");

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.9,
        },
      }),
    });

    const data = await response.json();

    if (!data.response) {
      throw new Error("No response from AI model");
    }

    return data.response.trim();
  } catch (error) {
    console.error("AI generation error:", error);
    throw new Error("Failed to generate AI response");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest & { model?: string } = await req.json();
    const { message, history = [], model } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 },
      );
    }

    const validHistory = Array.isArray(history)
      ? history.filter(
          (msg) =>
            msg &&
            typeof msg === "object" &&
            typeof msg.role === "string" &&
            typeof msg.content === "string" &&
            ["user", "assistant"].includes(msg.role),
        )
      : [];

    const recentHistory = validHistory.slice(-10);

    const messages: ChatMessage[] = [
      ...recentHistory,
      { role: "user", content: message },
    ];

    const aiResponse = await generateAIResponse(messages, model);

    return NextResponse.json({
      response: aiResponse,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        error: "Failed to generate AI response",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
