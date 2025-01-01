import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

const BIBLE_BOOKS = [
	"Genesis",
	"Exodus",
	"Leviticus",
	"Numbers",
	"Deuteronomy",
	"Joshua",
	"Judges",
	"Ruth",
	"1 Samuel",
	"2 Samuel",
	"1 Kings",
	"2 Kings",
	"1 Chronicles",
	"2 Chronicles",
	"Ezra",
	"Nehemiah",
	"Esther",
	"Job",
	"Psalm",
	"Proverbs",
	"Ecclesiastes",
	"Song of Solomon",
	"Isaiah",
	"Jeremiah",
	"Lamentations",
	"Ezekiel",
	"Daniel",
	"Hosea",
	"Joel",
	"Amos",
	"Obadiah",
	"Jonah",
	"Micah",
	"Nahum",
	"Habakkuk",
	"Zephaniah",
	"Haggai",
	"Zechariah",
	"Malachi",
	"Matthew",
	"Mark",
	"Luke",
	"John",
	"Acts",
	"Romans",
	"1 Corinthians",
	"2 Corinthians",
	"Galatians",
	"Ephesians",
	"Philippians",
	"Colossians",
	"1 Thessalonians",
	"2 Thessalonians",
	"1 Timothy",
	"2 Timothy",
	"Titus",
	"Philemon",
	"Hebrews",
	"James",
	"1 Peter",
	"2 Peter",
	"1 John",
	"2 John",
	"3 John",
	"Jude",
	"Revelation",
];

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

export function sortBibleChapterPosts(posts: Array<CollectionEntry<"post">>) {
	// sort the list of posts by title in order of BIBLE_BOOKS
	return posts.sort((a, b) => {
		const aIndex = BIBLE_BOOKS.indexOf(a.data.title);
		const bIndex = BIBLE_BOOKS.indexOf(b.data.title);
		return aIndex - bIndex;
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
