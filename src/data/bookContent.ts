import aiAgentsCover from "@/assets/ai-agents-cover.jpg";
import { AI_AGENTS_BOOK } from "./aiAgentsBook";
import { BOOK1_CONTENT } from "./books/book1";
import { BOOK2_CONTENT } from "./books/book2";
import { BOOK3_CONTENT } from "./books/book3";
import { BOOK4_CONTENT } from "./books/book4";
import { BOOK5_CONTENT } from "./books/book5";
import { BOOK6_CONTENT } from "./books/book6";
import { BOOK7_CONTENT } from "./books/book7";
import { BOOK8_CONTENT } from "./books/book8";
import { PYTHON_PROGRAMMING_CONTENT } from "./books/pythonProgramming";

export const CUSTOM_COVERS: Record<number, string> = { 
  9: aiAgentsCover
};

export interface BookContent {
  cover: { tagline: string; blurb: string };
  toc: string[];
  chapters: { title: string; pages: string[]; images?: string[] }[];
}

export const BOOK_CONTENT: Record<number, BookContent> = {
  1: BOOK1_CONTENT,
  2: BOOK2_CONTENT,
  3: BOOK3_CONTENT,
  4: BOOK4_CONTENT,
  5: BOOK5_CONTENT,
  6: BOOK6_CONTENT,
  7: BOOK7_CONTENT,
  8: BOOK8_CONTENT,
  9: AI_AGENTS_BOOK,
  11: PYTHON_PROGRAMMING_CONTENT,
};
