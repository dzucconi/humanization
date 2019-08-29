import { initRand } from "../rand";
import { repeat } from "./repeat";
import { process, isProcessedWord } from "../process";

describe("#repeat", () => {
  beforeAll(() => initRand("seed"));

  test("sometimes repeats ! on the end of hey", () => {
    const output = new Array(20)
      .fill(undefined)
      .map(() => repeat(process("hey!")[0]))
      .map(hey => {
        if (isProcessedWord(hey)) {
          return hey[hey.length - 1].transformed.length;
        }
      });

    // prettier-ignore
    expect(output).toEqual([
      1, 1, 1, 1, 1, 1, 1, 7, 1, 1,
      6, 8, 1, 1, 1, 1, 1, 1, 1, 1
    ]);
  });
});
