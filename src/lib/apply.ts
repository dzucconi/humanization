import { ProcessedWord, ProcessedCharacter, isProcessedWord } from "./process";

export type Applicable = ProcessedWord | ProcessedCharacter;
export type Applicator = (input: Applicable) => Applicable;

export const apply = (fn: Applicator, input: Applicable, probability = 0.0) => {
  return Math.random() > 1.0 - probability ? fn(input) : input;
};
