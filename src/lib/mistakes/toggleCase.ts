import { isProcessedCharacter } from "../process";
import { Applicator } from "../apply";

export const toggleCase: Applicator = input => {
  if (isProcessedCharacter(input)) {
    return {
      ...input,
      transformed: input.transformed.map(char =>
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      )
    };
  }

  return input;
};
