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
		case "Judges":
			bookAbbreviation = "JDG";
			break;
		case "Ruth":
			bookAbbreviation = "RUT";
			break;
		case "1 Samuel":
			bookAbbreviation = "1SA";
			break;
		case "2 Samuel":
			bookAbbreviation = "2SA";
			break;
		case "2 Kings":
			bookAbbreviation = "2KI";
			break;
		case "1 Kings":
			bookAbbreviation = "1KI";
			break;
		case "2 Chronicles":
			bookAbbreviation = "2CH";
			break;
		case "1 Chronicles":
			bookAbbreviation = "1CH";
			break;
		case "Ezra":
			bookAbbreviation = "EZR";
			break;
		default:
			break;
	}

	return `${bookAbbreviation}${chapter}V${verse}`;
}

export { convertReferenceObjectToId };
