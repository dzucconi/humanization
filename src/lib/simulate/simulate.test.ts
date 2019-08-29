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
          })
        })
      ).toStrictEqual([
        {
          character: "h",
          processedCharacter: { source: "h", transformed: ["h"] }
        },
        {
          character: "e",
          processedCharacter: { source: "e", transformed: ["e"] }
        },
        {
          character: "l",
          processedCharacter: { source: "l", transformed: ["l"] }
        },
        {
          character: "l",
          processedCharacter: { source: "l", transformed: ["l"] }
        },
        {
          character: "o",
          processedCharacter: { source: "o", transformed: ["o"] }
        },
        {
          character: "!",
          processedCharacter: { source: "!", transformed: ["!"] }
        },
        {
          character: " ",
          processedCharacter: { source: " ", transformed: [" "] }
        },
        {
          character: "w",
          processedCharacter: { source: "w", transformed: ["w"] }
        },
        {
          character: "o",
          processedCharacter: { source: "o", transformed: ["o"] }
        },
        {
          character: "r",
          processedCharacter: { source: "r", transformed: ["r"] }
        },
        {
          character: "l",
          processedCharacter: { source: "l", transformed: ["l"] }
        },
        {
          character: "d",
          processedCharacter: { source: "d", transformed: ["d"] }
        },
        {
          character: "!",
          processedCharacter: { source: "!", transformed: ["!", "!", "!"] }
        },
        {
          character: "!",
          processedCharacter: { source: "!", transformed: ["!", "!", "!"] }
        },
        {
          character: "!",
          processedCharacter: { source: "!", transformed: ["!", "!", "!"] }
        }
      ]);
    });
  });
});
