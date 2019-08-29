import { range } from "../rand";
import { isPromise } from "../util";
import { ProcessedCharacter } from "../process";
import { Stream } from "../humanize";

export interface StrokedCharacter {
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
    ...stream.map((word, i) => [
      ...[].concat(
        ...word.map(processedCharacter => {
          return processedCharacter.transformed.map(
            (character: string): StrokedCharacter => ({
              character,
              processedCharacter
            })
          );
        })
      ),

      // Stream flattens out so re-introduce spaces
      // appended to the end of each word (unless we're at the end):
      ...(stream.length - 1 === i
        ? []
        : [
            <StrokedCharacter>{
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
    strokedStream
  }: {
    stroke: StrokedCharacter;
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
  return generateStrokedStream({ stream }).reduce((promise, stroke) => {
    return promise.then((prevStrokes: StrokedStream | []) => {
      const nextStream = [...prevStrokes, stroke];

      return new Promise(resolve => {
        const maybePromise = onStroke({
          stroke,
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
