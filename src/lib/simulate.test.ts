import { initRand } from "./rand";
import { generateStrokes } from "./simulate";

describe("simulate", () => {
  describe("#generateStrokes", () => {
    beforeAll(() => initRand("seed"));

    test("generates a score of strokes", () => {
      expect(generateStrokes({ message: "hello world" })).toStrictEqual([
        { character: "h", pause: 148.0524807743914 },
        { character: "e", pause: 212.59747079576542 },
        { character: "l", pause: 50.18611761885611 },
        { character: "l", pause: 141.51371452178012 },
        { character: "o", pause: 242.8146998786989 },
        { character: " ", pause: 56.95452722618195 },
        { character: "w", pause: 142.49078057123705 },
        { character: "o", pause: 20.510702939331594 },
        { character: "r", pause: 182.31195058538083 },
        { character: "l", pause: 224.77950757051298 },
        { character: "d", pause: 88.79464784005522 }
      ]);
    });
  });
});
