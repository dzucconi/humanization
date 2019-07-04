import { neighborsOf, Character } from "../keyboard";
import { sample } from "../sample";

export const miss = (char: Character): Character => {
  const neighbors = neighborsOf(char);

  if (neighbors.length === 0) return char;

  return sample(neighbors);
};
