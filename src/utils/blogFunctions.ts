import { type CollectionEntry, getCollection } from "astro:content";
import { slugify } from "./commonFunctions";

export async function getPosts(collection: "articles" | "projects" = "articles") {

	return await getCollection(collection as any, ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** filter out draft posts based on the environment */
export async function getAllPosts() {
	return await getCollection("articles", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** returns the date of the post based on option in siteConfig.sortPostsByUpdatedDate */
export function getPostSortDate(post: CollectionEntry<"articles">) {
	return new Date(post.data.publishedDate);
}

/** sort posts by date, desc.*/
export function sortPostsByDate(posts: CollectionEntry<"articles">[]) {
	return posts.sort((a, b) => {
		return new Date(b.data.publishedDate).getTime() - new Date(a.data.publishedDate).getTime();
	});
}

/** groups posts by year (based on option siteConfig.sortPostsByUpdatedDate), using the year as the key
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 */
export function groupPostsByYear(posts: CollectionEntry<"articles">[]) {
	return posts.reduce<Record<string, CollectionEntry<"articles">[]>>((acc, post) => {
		const year = getPostSortDate(post).getFullYear();
		if (!acc[year]) {
			acc[year] = [];
		}
		acc[year]?.push(post);
		return acc;
	}, {});
}

/** returns all tags created from posts (inc duplicate tags)
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getAllTags(posts: CollectionEntry<"articles">[]) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/** returns all unique tags created from posts
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTags(posts: CollectionEntry<"articles">[]) {
	return [...new Set(getAllTags(posts))];
}

/** returns a count of each unique tag - [[tagName, count], ...]
 *  Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so.
 *  */
export function getUniqueTagsWithCount(posts: CollectionEntry<"articles">[]): [string, number][] {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) ?? 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}

export function getPostsByCategory(posts: CollectionEntry<'articles'>[], categorySlug: string) {
  const filteredPosts: CollectionEntry<'articles'>[] = posts.filter((post) => categorySlug === slugify(post.data.category));
  return filteredPosts;
}