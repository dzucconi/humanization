import { sample } from "../rand";
import { isProcessedWord } from "../process";
import { Applicator } from "../apply";

export const substitute: Applicator = input => {
  if (isProcessedWord(input)) {
    if (input.length <= 2) {
      return input;
    }

    const place = sample(input);
    const placeIndex = input.indexOf(place);
    const swap = input[placeIndex + 1] || input[placeIndex - 1];
    const swapIndex = input.indexOf(swap);
    const isAtEnd = placeIndex > swapIndex;

    if (!swap) {
      return input;
    }

    const reordered = [
      ...input.slice(0, isAtEnd ? swapIndex : placeIndex),
      ...(isAtEnd ? [place, swap] : [swap, place]),
      ...(isAtEnd ? [] : input.slice(swapIndex + 1))
    ];

    return input.map((processedCharacter, i) => ({
      ...processedCharacter,
      transformed: reordered[i].transformed
    }));
  }

  return input;
};
