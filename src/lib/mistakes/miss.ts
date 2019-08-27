import { isProcessedCharacter } from "../process";
import { Applicator } from "../apply";
import { neighborsOf, Character } from "../keyboard";
import { sample } from "../sample";

export const __miss__ = (character: Character): Character => {
  const neighbors = neighborsOf(character);
  if (neighbors.length === 0) return character;
  return sample(neighbors);
};

function isValidKeyboardCharacter(string: string): string is Character {
  return <Character>string !== undefined;
}

export const miss: Applicator = input => {
  if (isProcessedCharacter(input)) {
    return {
      ...input,
      transformed: input.transformed.map(char => {
        if (isValidKeyboardCharacter(char)) {
          return __miss__(char);
        }

        return char;
      })
    };
  }

  return input;
};
