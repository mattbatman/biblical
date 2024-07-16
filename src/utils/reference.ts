function convertReferenceObjectToId({
	book,
	chapter,
	verse,
}: {
	book: string;
	chapter: number;
	verse: number;
}): string {
	let bookAbbreviation = book;

	switch (book) {
		case "Genesis":
			bookAbbreviation = "GEN";
			break;
		case "Exodus":
			bookAbbreviation = "EXO";
			break;
		case "Leviticus":
			bookAbbreviation = "LEV";
			break;
		case "Numbers":
			bookAbbreviation = "NUM";
			break;
		case "Deuteronomy":
			bookAbbreviation = "DEU";
			break;
		case "Joshua":
			bookAbbreviation = "JOS";
			break;
		default:
			break;
	}

	return `${bookAbbreviation}${chapter}V${verse}`;
}

export { convertReferenceObjectToId };
