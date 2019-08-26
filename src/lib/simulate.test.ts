import { initRand } from "./rand";
import { process } from "./process";
import { generateStrokedStream } from "./simulate";

describe("simulate", () => {
  describe("#generateStrokes", () => {
    beforeAll(() => initRand("seed"));

    test("generates a score of strokes", () => {
      expect(
        generateStrokedStream({ stream: process("hello world") })
      ).toStrictEqual([
        { character: { source: "h", transformed: ["h"] }, pause: 148 },
        { character: { source: "e", transformed: ["e"] }, pause: 213 },
        { character: { source: "l", transformed: ["l"] }, pause: 50 },
        { character: { source: "l", transformed: ["l"] }, pause: 142 },
        { character: { source: "o", transformed: ["o"] }, pause: 243 },
        { character: { source: " ", transformed: [" "] }, pause: 57 },
        { character: { source: "w", transformed: ["w"] }, pause: 143 },
        { character: { source: "o", transformed: ["o"] }, pause: 20 },
        { character: { source: "r", transformed: ["r"] }, pause: 183 },
        { character: { source: "l", transformed: ["l"] }, pause: 225 },
        { character: { source: "d", transformed: ["d"] }, pause: 89 }
      ]);
    });
  });
});
