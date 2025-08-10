function countDependingOnType(paragraph) {
	if (paragraph.type) {
		if (paragraph.type === 'text' || paragraph.type === 'italics') 
			return paragraph.value.length
		else
			return 0
	} else
		return paragraph.length
}

export function countCharacters(arrayOfArrayOfParagraphs) {
	return arrayOfArrayOfParagraphs.reduce(
		(accumulator, arrayOfParagraphs) =>
		accumulator + arrayOfParagraphs.reduce(
			(intermediate, paragraph) => intermediate + countDependingOnType(paragraph),
			0
		),
		0
	);
}
