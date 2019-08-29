import { initRand } from "./rand";
import { apply, Applicator } from "./apply";
import {
  process,
  ProcessedCharacter,
  ProcessedWord,
  ProcessedStream,
  toString as processedStreamToString
} from "./process";
import { StrokedStream, toString as strokedStreamToString } from "./simulate";
import * as Mistakes from "./mistakes";

export const DEFAULT_MISTAKES: Mistake[] = [
  { apply: Mistakes.miss, probability: 0.033 },
  { apply: Mistakes.omit, probability: 0.033 },
  { apply: Mistakes.duplicate, probability: 0.001 },
  { apply: Mistakes.toggleCase, probability: 0.033 },
  { apply: Mistakes.capitalize, probability: 0.033 },
  { apply: Mistakes.repeat, probability: 0.5 },
  { apply: Mistakes.substitute, probability: 0.5 }
];

export interface Mistake {
  apply: Applicator;
  probability: number;
}

export type Stream = ProcessedWord[];

class Humanized {
  stream: Stream;

  constructor(stream: Stream) {
    this.stream = stream;
  }

  toString() {
    return toString(this.stream);
  }
}

export function humanize(
  string: string,
  options: {
    seed?: string;
    mistakes?: Mistake[];
  } = {}
): Humanized {
  const { seed, mistakes = DEFAULT_MISTAKES } = options;
  const stream = process(string);

  if (seed) initRand(seed);

  return new Humanized(
    mistakes.reduce((stream, mistake) => {
      return stream.map(word => {
        return (apply(
          mistake.apply,
          word,
          mistake.probability
        ) as ProcessedWord).map(char => {
          return apply(
            mistake.apply,
            char,
            mistake.probability
          ) as ProcessedCharacter;
        });
      });
    }, stream)
  );
}

export const toString = (stream: StrokedStream | ProcessedStream): string => {
  if (stream[0].constructor === Array) {
    return processedStreamToString(<ProcessedStream>stream);
  }
  return strokedStreamToString(<StrokedStream>stream);
};
