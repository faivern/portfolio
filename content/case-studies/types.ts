import type { ProjectMedia } from "@/app/projects/data";

export type CaseBlock =
  | { type: "paragraph"; text: string }
  | {
      type: "code";
      language: "xml" | "bash" | "text";
      caption: string;
      code: string;
    }
  | { type: "images"; images: ProjectMedia[] }
  | {
      type: "diagram";
      caption: string;
      nodes: { title: string; detail: string }[];
    }
  | { type: "timeline"; items: { title: string; detail: string }[] }
  | { type: "table"; caption: string; headers: string[]; rows: string[][] };
export type CaseStudy = {
  context: string;
  sources?: { title: string; url: string; detail: string }[];
  techniques?: { id: string; name: string; url: string }[];
  sections: { id: string; title: string; blocks: CaseBlock[] }[];
};
