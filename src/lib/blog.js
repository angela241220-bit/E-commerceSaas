import fs from "fs";
import path from "path";
import matter from "gray-matter";
const BLOG_DIRECTORY = path.join(process.cwd(), "content/blog");
function calculateReadingTime(content) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}
export function getAllPosts() {
    if (!fs.existsSync(BLOG_DIRECTORY)) {
        return [];
    }
    const files = fs.readdirSync(BLOG_DIRECTORY);
    const posts = files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const fullPath = path.join(BLOG_DIRECTORY, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        return {
            slug,
            title: data.title || "Untitled",
            description: data.description || "",
            date: data.date || new Date().toISOString(),
            author: data.author || "Zynkart Team",
            image: data.image || "/images/blog/default.jpg",
            tags: data.tags || [],
            readingTime: calculateReadingTime(content),
        };
    })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return posts;
}
export function getPostBySlug(slug) {
    const fullPath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
        return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        author: data.author || "Zynkart Team",
        image: data.image || "/images/blog/default.jpg",
        tags: data.tags || [],
        content,
        readingTime: calculateReadingTime(content),
    };
}
export function getAllSlugs() {
    if (!fs.existsSync(BLOG_DIRECTORY)) {
        return [];
    }
    const files = fs.readdirSync(BLOG_DIRECTORY);
    return files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(/\.mdx$/, ""));
}
export function getRelatedPosts(currentSlug, tags, limit = 3) {
    const allPosts = getAllPosts();
    return allPosts
        .filter((post) => post.slug !== currentSlug)
        .filter((post) => post.tags.some((tag) => tags.includes(tag)))
        .slice(0, limit);
}
