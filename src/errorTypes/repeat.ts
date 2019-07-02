import { remapRange } from "../lib/remapRange";

const IGNORED_INPUT_TAILS = [","];

type TailProbabilityOffsets = { [key: string]: number };

const TAIL_PROBABILITY_OFFSETS: TailProbabilityOffsets = {
  "!": 0.1,
  "?": 0.09,
  o: 0.07,
  u: 0.06
};

export const repeat = (input: string): string => {
  const tail = input[input.length - 1];

  if (IGNORED_INPUT_TAILS.includes(tail)) {
    return input;
  }

  const probabilityOffset = TAIL_PROBABILITY_OFFSETS[tail] || 0.0;

  const probability =
    1.0 +
    probabilityOffset -
    remapRange(input.length, {
      in: {
        min: 1,
        max: 20
      },
      out: {
        min: 0.0,
        max: 1.0
      }
    });

  return Math.random() < probability ? repeat(input + tail) : input;
};
