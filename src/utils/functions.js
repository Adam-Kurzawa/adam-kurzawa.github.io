export function countCharacters(arrayOfArrayOfStrings) {
  return arrayOfArrayOfStrings.reduce(
    (accumulator, arrayOfStrings) =>
      accumulator +
      arrayOfStrings.reduce(
        (intermediate, string) => intermediate + string.length,
        0
      ),
    0
  );
}
