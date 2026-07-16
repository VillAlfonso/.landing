/**
 * Projects, newest first. `tech` holds stack ids (src/data/stack.ts) —
 * unknown ids still render as plain text chips until an icon is added.
 * `featured` pins a project to the home page (top 3). Rows marked
 * `sample: true` are placeholders — replace them with real work.
 */
export type Project = {
  slug: string;
  title: string;
  year: string;
  description: string;
  tech: string[];
  href?: string;
  featured?: boolean;
  sample?: boolean;
};

export const projects: Project[] = [
  {
    slug: "auto-shorts",
    title: "auto-shorts pipeline",
    year: "2025",
    description:
      "an unattended pipeline that turns scripts into rendered vertical video — remotion for the frames, python for the glue, aws for the heavy lifting.",
    tech: ["remotion", "python", "aws"],
    featured: true,
    sample: true,
  },
  {
    slug: "comfy-node-pack",
    title: "comfyui node pack",
    year: "2025",
    description:
      "a small pack of quality-of-life nodes for comfyui graphs. batch prompting, tidy outputs, fewer spaghetti wires.",
    tech: ["comfyui", "python"],
    featured: true,
    sample: true,
  },
  {
    slug: "this-site",
    title: "this website",
    year: "2026",
    description:
      "the grid-paper portfolio you are reading. black, white, and a lot of springs.",
    tech: ["javascript", "claude"],
    featured: true,
  },
];
