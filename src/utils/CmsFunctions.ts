import { type CollectionEntry, getCollection } from "astro:content";
import { slugify } from "./commonFunctions";
const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;

export const getPosts = async (maxPosts?: number, collectionName?: string) => {
  
  let queryCollection = collectionName || "articles"
  return (await getCollection(queryCollection))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf())
		.slice(0, maxPosts);
};