import { type CollectionEntry } from "astro:content";
import { slugify } from "./commonFunctions";
const isProd = import.meta.env.PROD;
const isDev = import.meta.env.DEV;

export const sortPostsByDate = (posts: CollectionEntry<'blogs'>[]): CollectionEntry<'blogs'>[] => {
  return posts.sort((a, b) => {
      return new Date(b.data.publishedDate).getTime() - new Date(a.data.publishedDate).getTime()
  })
}

export const filterPostsByStatus = ({data}: CollectionEntry<'blogs'>): boolean => {
  return isProd ? !data.published : true;
}

export function getPostsByTag(posts: CollectionEntry<'blogs'>[], tagSlug: string) {
  const filteredPosts: CollectionEntry<'blogs'>[] = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagSlug));
  return filteredPosts;
}

export function getAllTags(posts: CollectionEntry<'blogs'>[]) {
  const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
  return tags
      .map((tag) => {
          return {
              name: tag,
              slug: slugify(tag)
          };
      })
      .filter((obj, pos, arr) => {
          return arr.map((mapObj) => mapObj.slug).indexOf(obj.slug) === pos;
      });
}

export function getAllPostTags(posts: CollectionEntry<'blogs'>[]) {
  const tags: string[] = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
  return tags;
}

export function getPostsByCategory(posts: CollectionEntry<'blogs'>[], categorySlug: string) {
  const filteredPosts: CollectionEntry<'blogs'>[] = posts.filter((post) => categorySlug === slugify(post.data.category));
  return filteredPosts;
}