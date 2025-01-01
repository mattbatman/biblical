import { z, defineCollection } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string().max(60),
			description: z.string().min(50).max(160).optional(),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			coverImage: z
				.object({
					src: image(),
					alt: z.string(),
				})
				.optional(),
			draft: z.boolean().default(false),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			outline: z
				.array(
					z.object({
						text: z.string(),
						start: z.object({
							book: z.string(),
							chapter: z.number(),
							verse: z.number(),
						}),
					}),
				)
				.optional(),
			people: z.array(z.string()).default([]),
			ogImage: z.string().optional(),
			pageType: z.enum(["bibleChapter", "other"]),
		}),
});

export const collections = { post };
