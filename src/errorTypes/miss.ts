import { neighborsOf, Character } from "../lib/keyboard";
import { sample } from "../lib/sample";

export const miss = (char: Character): Character => {
  const neighbors = neighborsOf(char);

  if (neighbors.length === 0) return char;

  return sample(neighbors);
};
