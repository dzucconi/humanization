import { isProcessedCharacter } from "../process";
import { Applicator } from "../apply";

export const duplicate: Applicator = input => {
  if (isProcessedCharacter(input)) {
    return {
      ...input,
      transformed: [].concat(...input.transformed.map(char => [char, char]))
    };
  }

  return input;
};
