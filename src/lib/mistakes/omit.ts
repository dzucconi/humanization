import { isProcessedCharacter } from "../process";
import { Applicator } from "../apply";

export const omit: Applicator = input => {
  if (isProcessedCharacter(input)) {
    return {
      ...input,
      transformed: input.transformed.map(() => "")
    };
  }

  return input;
};
