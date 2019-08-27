import { initRand } from "../rand";
import { miss } from "./miss";

import { process } from "../process";

describe("#miss", () => {
  beforeAll(() => initRand("seed"));

  test("should miss the key to a surrounding key", () => {
    const character = process("f")[0][0];

    expect(miss(character)).toEqual({
      source: "f",
      transformed: ["g"]
    });
  });
});
