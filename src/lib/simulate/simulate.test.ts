import { initRand } from "../rand";
import { humanize } from "../humanize";
import { repeat } from "../mistakes";
import { generateStrokedStream } from "./simulate";

describe("simulate", () => {
  describe("#generateStrokes", () => {
    beforeAll(() => initRand("1"));

    test("generates a score of strokes", () => {
      expect(
        generateStrokedStream({
          stream: humanize("hello! world!", {
            mistakes: [{ apply: repeat, probability: 1 }]
          }).stream
        })
      ).toStrictEqual([
        {
          index: [0, 0],
          character: "h",
          processedCharacter: { source: "h", transformed: ["h"] }
        },
        {
          index: [0, 1],
          character: "e",
          processedCharacter: { source: "e", transformed: ["e"] }
        },
        {
          index: [0, 2],
          character: "l",
          processedCharacter: { source: "l", transformed: ["l"] }
        },
        {
          index: [0, 3],
          character: "l",
          processedCharacter: { source: "l", transformed: ["l"] }
        },
        {
          index: [0, 4],
          character: "o",
          processedCharacter: { source: "o", transformed: ["o"] }
        },
        {
          index: [0, 5],
          character: "!",
          processedCharacter: { source: "!", transformed: ["!"] }
        },
        {
          index: [],
          character: " ",
          processedCharacter: { source: " ", transformed: [" "] }
        },
        {
          index: [1, 0],
          character: "w",
          processedCharacter: { source: "w", transformed: ["w"] }
        },
        {
          index: [1, 1],
          character: "o",
          processedCharacter: { source: "o", transformed: ["o"] }
        },
        {
          index: [1, 2],
          character: "r",
          processedCharacter: { source: "r", transformed: ["r"] }
        },
        {
          index: [1, 3],
          character: "l",
          processedCharacter: { source: "l", transformed: ["l"] }
        },
        {
          index: [1, 4],
          character: "d",
          processedCharacter: { source: "d", transformed: ["d"] }
        },
        {
          index: [1, 5],
          character: "!",
          processedCharacter: { source: "!", transformed: ["!", "!", "!"] }
        },
        {
          index: [1, 5],
          character: "!",
          processedCharacter: { source: "!", transformed: ["!", "!", "!"] }
        },
        {
          index: [1, 5],
          character: "!",
          processedCharacter: { source: "!", transformed: ["!", "!", "!"] }
        }
      ]);
    });
  });
});
