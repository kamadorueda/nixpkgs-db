import Levenshtein from 'levenshtein';

export const levenshtein = (a, b) => (
  new Levenshtein(a, b).distance
);

export const searchString = (item, list) => {
  // Use a mix of Levenshtein distance + grep to offer human-expectable results
  const itemLower = item.toLowerCase();

  const distances = list.map((elem) => {
    const elemLower = elem.toLowerCase();

    let distance;

    if (elemLower === itemLower) {
      distance = 0;
    } else if (elemLower.includes(itemLower)) {
      distance = 1;
    } else {
      distance = levenshtein(itemLower, elemLower);
    }

    return [distance, elem];
  });

  return distances
    // Sort by Levenshtein distance
    .sort((a, b) => a[0] - b[0])
    // Extract the original item
    .map((x) => x[1]);
}
