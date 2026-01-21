import { request } from "http";
import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface CodeSuggestionRequest {
  fileContent: string;
  cursorLine: number;
  cursorColumn: number;
  suggestionType: string;
  fileName?: string;
}

interface CodeContext {
  language: string;
  framework: string;
  beforeContext: string;
  currentLine: string;
  afterContext: string;
  cursorPosition: { line: number; column: number };
  isInFunction: boolean;
  isInClass: boolean;
  isAfterComment: boolean;
  incompletePatterns: string[];
}

const DEFAULT_MODEL = "starcoder2:3b";

export async function POST(request: NextRequest) {
  try {
    const body: CodeSuggestionRequest = await request.json();

    const { fileContent, cursorLine, cursorColumn, suggestionType, fileName } =
      body;

    if (!fileContent || cursorLine < 0 || cursorColumn < 0 || !suggestionType) {
      return NextResponse.json(
        { error: "Invalid input parameters" },
        { status: 400 },
      );
    }

    const context = analyzeCodeContext(
      fileContent,
      cursorLine,
      cursorColumn,
      fileName,
    );

    const prompt = buildPrompt(context, suggestionType);

    const suggestion = await generateSuggestion(prompt);

    return NextResponse.json({
      suggestion,
      context,
      metadata: {
        language: context.language,
        framework: context.framework,
        position: context.cursorPosition,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Context analysis error:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error.message },
      { status: 500 },
    );
  }
}

function analyzeCodeContext(
  content: string,
  line: number,
  column: number,
  fileName?: string,
): CodeContext {
  const lines = content.split("\n");
  const currentLine = lines[line] || "";

  const contextRadius = 10;
  const startLine = Math.max(0, line - contextRadius);
  const endLine = Math.min(lines.length, line + contextRadius);

  const beforeContext = lines.slice(startLine, line).join("\n");
  const afterContext = lines.slice(line + 1, endLine).join("\n");

  const language = detectLanguage(content, fileName);
  const framework = detectFramework(content);

  const isInFunction = detectInFunction(lines, line);
  const isInClass = detectInClass(lines, line);
  const isAfterComment = detectAfterComment(currentLine, column);
  const incompletePatterns = detectIncompletePatterns(currentLine, column);

  return {
    language,
    framework,
    beforeContext,
    currentLine,
    afterContext,
    cursorPosition: { line, column },
    isInFunction,
    isInClass,
    isAfterComment,
    incompletePatterns,
  };
}

function buildPrompt(context: CodeContext, suggestionType: string): string {
  const prefix =
    context.beforeContext +
    context.currentLine.substring(0, context.cursorPosition.column);
  const suffix =
    context.currentLine.substring(context.cursorPosition.column) +
    context.afterContext;

  return `<fim_prefix>${prefix}<fim_suffix>${suffix}<fim_middle>`;
}

async function generateSuggestion(prompt: string): Promise<string> {
  // Check for Gemini Provider
  const shouldUseGemini =
    process.env.AI_PROVIDER === "gemini" || !!process.env.GEMINI_API_KEY;

  if (shouldUseGemini && process.env.GEMINI_API_KEY) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      // "gemini-pro" does not support fill-in-the-middle natively, but we can approximate
      // or just ask it to complete the code.
      // For code completion, gemini-1.5-flash is fast.
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Clean prompt for Gemini: Just ask it to complete the code pattern
      // FIM tokens might confuse it if not fine-tuned, so we might strip them or use a completion prompt.
      // Simple translation for now:
      const cleanPrompt = prompt
        .replace(/<fim_prefix>/g, "")
        .replace(/<fim_suffix>/g, "[CURSOR]")
        .replace(/<fim_middle>/g, "");

      const parts = cleanPrompt.split("[CURSOR]");
      const before = parts[0] || "";
      const after = parts[1] || "";

      const completionPrompt = `You are a code completion engine. COMPLETE the code at the [CURSOR] location.
DO NOT repeat the existing code. output ONLY the missing code.
Code context:
${before}[CURSOR]${after}`;

      const result = await model.generateContent(completionPrompt);
      const response = result.response;
      let text = response.text();

      // Cleanup markdown if gemini adds it
      if (text.startsWith("```")) {
        const match = text.match(/```[\w]*\n?([\s\S]*?)```/);
        text = match ? match[1] : text;
      }

      return text.trim();
    } catch (error) {
      console.error("Gemini Completion Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return `// AI suggestion unavailable: ${errorMessage}`;
    }
  }

  // Fallback to Ollama (Starcoder2 FIM)
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        prompt, // Starcoder expects FIM format directly
        stream: false,
        options: {
          temperature: 0.2,
          max_tokens: 128,
          stop: ["<fim_middle>", "```"],
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("DEBUG: Raw AI Response:", JSON.stringify(data));
    let suggestion = data.response;
    console.log("DEBUG: Extracted Suggestion:", suggestion);

    suggestion = suggestion.replace(
      /<file_sep>|<fim_prefix>|<fim_suffix>|<fim_middle>/g,
      "",
    );

    if (suggestion.includes("```")) {
      const codeMatch = suggestion.match(/```[\w]*\n?([\s\S]*?)```/);
      suggestion = codeMatch ? codeMatch[1].trim() : suggestion;
    }

    return suggestion;
  } catch (error) {
    console.error("AI generation error:", error);
    return "// AI suggestion unavailable";
  }
}

function detectLanguage(content: string, fileName?: string): string {
  if (fileName) {
    const ext = fileName.split(".").pop()?.toLowerCase();
    const extMap: Record<string, string> = {
      ts: "TypeScript",
      tsx: "TypeScript",
      js: "JavaScript",
      jsx: "JavaScript",
      py: "Python",
      java: "Java",
      go: "Go",
      rs: "Rust",
      php: "PHP",
    };
    if (ext && extMap[ext]) return extMap[ext];
  }

  if (content.includes("interface ") || content.includes(": string"))
    return "TypeScript";
  if (content.includes("def ") || content.includes("import ")) return "Python";
  if (content.includes("func ") || content.includes("package ")) return "Go";

  return "JavaScript";
}

function detectFramework(content: string): string {
  if (content.includes("import React") || content.includes("useState"))
    return "React";
  if (content.includes("import Vue") || content.includes("<template>"))
    return "Vue";
  if (content.includes("@angular/") || content.includes("@Component"))
    return "Angular";
  if (content.includes("next/") || content.includes("getServerSideProps"))
    return "Next.js";

  return "None";
}

function detectInFunction(lines: string[], currentLine: number): boolean {
  for (let i = currentLine - 1; i >= 0; i--) {
    const line = lines[i];
    if (line?.match(/^\s*(function|def|const\s+\w+\s*=|let\s+\w+\s*=)/))
      return true;
    if (line?.match(/^\s*}/)) break;
  }
  return false;
}

function detectInClass(lines: string[], currentLine: number): boolean {
  for (let i = currentLine - 1; i >= 0; i--) {
    const line = lines[i];
    if (line?.match(/^\s*(class|interface)\s+/)) return true;
  }
  return false;
}

function detectAfterComment(line: string, column: number): boolean {
  const beforeCursor = line.substring(0, column);
  return /\/\/.*$/.test(beforeCursor) || /#.*$/.test(beforeCursor);
}

function detectIncompletePatterns(line: string, column: number): string[] {
  const beforeCursor = line.substring(0, column);
  const patterns: string[] = [];

  if (/^\s*(if|while|for)\s*\($/.test(beforeCursor.trim()))
    patterns.push("conditional");
  if (/^\s*(function|def)\s*$/.test(beforeCursor.trim()))
    patterns.push("function");
  if (/\{\s*$/.test(beforeCursor)) patterns.push("object");
  if (/\[\s*$/.test(beforeCursor)) patterns.push("array");
  if (/=\s*$/.test(beforeCursor)) patterns.push("assignment");
  if (/\.\s*$/.test(beforeCursor)) patterns.push("method-call");

  return patterns;
}
