import { range } from "../rand";
import { isPromise } from "../util";
import { ProcessedCharacter } from "../process";
import { Stream } from "../humanize";

export interface StrokedCharacter {
  index: [number, number] | [];
  character: string;
  processedCharacter: ProcessedCharacter;
}

export type StrokedStream = StrokedCharacter[];

export interface GenerateStrokedStream {
  stream: Stream;
}

export const generateStrokedStream = ({
  stream
}: GenerateStrokedStream): StrokedStream =>
  [].concat(
    ...stream.map((word, wordIndex) => [
      ...[].concat(
        ...word.map((processedCharacter, characterIndex) => {
          return processedCharacter.transformed.map(
            (character: string): StrokedCharacter => ({
              index: [wordIndex, characterIndex],
              character,
              processedCharacter
            })
          );
        })
      ),

      // Stream flattens out so re-introduce spaces
      // appended to the end of each word (unless we're at the end):
      ...(stream.length - 1 === wordIndex
        ? []
        : [
            <StrokedCharacter>{
              index: [],
              character: " ",
              processedCharacter: {
                source: " ",
                transformed: [" "]
              }
            }
          ])
    ])
  );

export interface SimulateTyping extends GenerateStrokedStream {
  pauseMin?: number;
  pauseMax?: number;
  onStroke({
    stroke,
    previousStroke,
    strokedStream
  }: {
    stroke: StrokedCharacter;
    previousStroke?: StrokedCharacter;
    strokedStream: StrokedStream;
  }): void | Promise<any>;
}

export const generateStrokeTiming = (
  options: {
    pauseMin?: number;
    pauseMax?: number;
    prevCharacter?: string;
  } = {}
) => {
  const { pauseMin = 15, pauseMax = 250, prevCharacter = null } = options;
  const timing =
    prevCharacter === " "
      ? // Strokes immediately following spaces tend to be slower
        [pauseMin + 50, pauseMax + 50]
      : [pauseMin, pauseMax];

  return range(timing[0], timing[1]);
};

export const simulateStrokeTiming = (
  options: {
    pauseMin?: number;
    pauseMax?: number;
    prevCharacter?: string;
  } = {}
) =>
  new Promise(resolve =>
    setTimeout(() => resolve(), generateStrokeTiming(options))
  );

export const simulateTyping = ({
  stream,
  onStroke,
  pauseMin = 15,
  pauseMax = 250
}: SimulateTyping) => {
  return generateStrokedStream({ stream }).reduce((promise, stroke, index) => {
    return promise.then((prevStrokes: StrokedStream | []) => {
      const nextStream = [...prevStrokes, stroke];
      const previousStroke = prevStrokes[index - 1];

      return new Promise(resolve => {
        const maybePromise = onStroke({
          stroke,
          previousStroke,
          strokedStream: nextStream
        });

        if (isPromise(maybePromise)) {
          return maybePromise.then(() => resolve(nextStream));
        }

        return simulateStrokeTiming({
          pauseMin,
          pauseMax,
          prevCharacter:
            prevStrokes.length && prevStrokes[prevStrokes.length - 1].character
        }).then(() => resolve(nextStream));
      });
    });
  }, Promise.resolve([]));
};

export const toString = (strokedStream: StrokedStream): string =>
  strokedStream.map(({ character }) => character).join("");
