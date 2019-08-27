import { isProcessedCharacter } from "../process";
import { Applicator } from "../apply";

export const capitalize: Applicator = input => {
  if (isProcessedCharacter(input)) {
    return {
      ...input,
      transformed: input.transformed.map(char => char.toUpperCase())
    };
  }

  return input;
};
