import { range } from "./rand";
import { ProcessedCharacter } from "./process";
import { Stream } from "./humanize";

const isPromise = (val: void | Promise<any>): val is Promise<any> =>
  val && (<Promise<any>>val).then !== undefined;

export interface StrokedCharacter {
  character: ProcessedCharacter;
  pause: number;
}

export type StrokedStream = StrokedCharacter[];

export interface GenerateStrokedStream {
  stream: Stream;
  pauseMin?: number;
  pauseMax?: number;
}

export const generateStrokedStream = ({
  stream,
  pauseMin = 15,
  pauseMax = 250
}: GenerateStrokedStream): StrokedStream =>
  [].concat(
    ...stream.map((word, i) => [
      ...word.map(character => ({
        character,
        pause: range(pauseMin, pauseMax)
      })),

      // Stream flattens out so re-introduce spaces
      // appended to the end of each word (unless we're at the end):
      ...(stream.length - 1 === i
        ? []
        : [
            {
              character: {
                source: " ",
                transformed: [" "]
              },
              pause: range(pauseMin, pauseMax)
            }
          ])
    ])
  );

export interface SimulateTyping extends GenerateStrokedStream {
  onStroke({
    stroke,
    strokedStream
  }: {
    stroke: StrokedCharacter;
    strokedStream: StrokedStream;
  }): void | Promise<any>;
}

export const simulateTyping = ({
  stream,
  onStroke,
  pauseMin = 15,
  pauseMax = 250
}: SimulateTyping) => {
  return generateStrokedStream({ stream, pauseMin, pauseMax }).reduce(
    (promise, stroke) => {
      return promise.then(prevStroke => {
        const nextStream = [...prevStroke, stroke];

        return new Promise(resolve => {
          const maybePromise = onStroke({
            stroke,
            strokedStream: nextStream
          });

          if (isPromise(maybePromise)) {
            return maybePromise.then(() => resolve(nextStream));
          }

          // Or we just set a timeout for the pause of the stroke.
          setTimeout(() => {
            resolve(nextStream);
          }, stroke.pause);
        });
      });
    },
    Promise.resolve([])
  );
};

export const toString = (strokedStream: StrokedStream): string =>
  strokedStream.map(({ character }) => character.transformed.join("")).join("");
