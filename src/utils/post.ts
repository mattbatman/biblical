import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

/** Note: this function filters out draft posts based on the environment */
export async function getAllPosts() {
	return await getCollection("post", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});
}

export async function getAllBibleChapters() {
	const allPosts = await getAllPosts();

	return allPosts.filter(function ({ data }) {
		const { pageType } = data;

		return pageType === "bibleChapter";
	});
}

export function sortMDByDate(posts: Array<CollectionEntry<"post">>) {
	return posts.sort((a, b) => {
		const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf();
		const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf();
		return bDate - aDate;
	});
}

/** Note: This function doesn't filter draft posts, pass it the result of k above to do so. */
export function getAllTags(posts: Array<CollectionEntry<"post">>) {
	return posts.flatMap((post) => [...post.data.tags]);
}

export function getAllPeople(posts: Array<CollectionEntry<"post">>) {
	return posts.flatMap((post) => [...post.data.people]);
}

/** Note: This function doesn't filter draft posts, pass it the result of k above to do so. */
export function getUniqueTags(posts: Array<CollectionEntry<"post">>) {
	return [...new Set(getAllTags(posts))];
}

export function getUniquePeople(posts: Array<CollectionEntry<"post">>) {
	return [...new Set(getAllPeople(posts))];
}

/** Note: This function doesn't filter draft posts, pass it the result of k above to do so. */
export function getUniqueTagsWithCount(
	posts: Array<CollectionEntry<"post">>,
): Array<[string, number]> {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}

export function getUniquePeopleWithCount(
	posts: Array<CollectionEntry<"post">>,
): Array<[string, number]> {
	return [
		...getAllPeople(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}
