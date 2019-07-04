import { initRand } from "../rand";
import { repeat } from "./repeat";

describe("#repeat", () => {
  beforeAll(() => initRand("seed"));

  test("repeats x", () => {
    const output = new Array(20)
      .fill(undefined)
      .map(() => repeat("x"))
      .map(x => x.length);

    expect(output).toEqual([
      5,
      5,
      10,
      8,
      5,
      7,
      5,
      6,
      9,
      5,
      2,
      5,
      7,
      4,
      4,
      4,
      8,
      6,
      2,
      4
    ]);
  });
});
