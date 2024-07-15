import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const articleCollection = defineCollection({
  type: "content",
  schema: z.object({
      title: z.string(),
      excerpt: z.string().default(""),
      featuredImage: z.string().default("/images/placeholder.png"),
      category: z.string().default("Undefined"),
      tags: z.array(z.string()).default(["Undefined"]),
      draft: z.boolean().default(false),
      publishedDate: z.date(),
  })
});

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
      title: z.string().max(60),
      excerpt: z.string().default(""),
      featuredImage: z.string().default("/images/placeholder.png"),
      category: z.string().default("Undefined"),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      draft: z.boolean().default(false),
      publishedDate: z.date(),
  })
});

export const collections = {
  articles: articleCollection,
  projects: projectCollection,
}