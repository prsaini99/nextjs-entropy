import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// German articles live in their own content dir, not in insights: they render
// under /de with German chrome, and they are review-gated (noindex until the
// German sales colleague signs off) while insights publish immediately.
const CONTENT_DIR = path.join(process.cwd(), "src", "content", "de-ratgeber");

export function getAllDeRatgeber() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"));
      return { slug, ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getDeRatgeber(slug) {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { slug, ...data, content };
}

export function getAllDeRatgeberSlugs() {
  return getAllDeRatgeber().map((i) => i.slug);
}
