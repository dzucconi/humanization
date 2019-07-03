import { initRand } from "../rand";
import { miss } from "./miss";

describe("#miss", () => {
  beforeAll(() => initRand("seed"));

  test("should miss the key to a surrounding key", () => {
    expect(miss("f")).toEqual("g");
  });
});
