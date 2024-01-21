import { defineCollection, z } from "astro:content";

const blogsCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        excerpt: z.string().default(""),
        featuredImage: z.string().default("/images/placeholder.png"),
        categories: z.array(z.string()).default(["others"]),
        tags: z.array(z.string()).default(["others"]),
        published: z.boolean().default(false),
        publishedDate: z.date(),
    })
});

export const collections = {
    blogs: blogsCollection,
}