import { sample } from "../rand";
import { times } from "../util";
import { isProcessedWord } from "../process";
import { Applicator } from "../apply";

const IGNORED_INPUT_TAILS = [","];

type TailProbabilities = { [key: string]: number };

const TAIL_PROBABILITIES: TailProbabilities = {
  "!": 0.1,
  "?": 0.09,
  o: 0.07,
  u: 0.06,
  e: 0.03,
  i: 0.03,
  y: 0.03
};

// prettier-ignore
const LENGTHS = [
  2, 2, 2, 2, 2, 2, 2,
  3, 3, 3, 3, 3,
  4, 4, 4,
  5, 5,
  6,
  7,
  8,
  9,
  10,
  11,
  12
]

export const repeat: Applicator = input => {
  if (isProcessedWord(input)) {
    const [tail, ...rest] = [...input].reverse();

    if (IGNORED_INPUT_TAILS.includes(tail.source)) {
      return input;
    }

    if (Math.random() > (TAIL_PROBABILITIES[tail.source] || 0)) {
      return input;
    }

    return [
      ...rest.reverse(),
      {
        ...tail,
        transformed: [
          ...times(sample(LENGTHS), () => tail.source),
          ...tail.transformed
        ]
      }
    ];
  }

  return input;
};
