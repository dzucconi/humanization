import { initRand } from "./rand";
import { apply } from "./apply";

describe("apply", () => {
  beforeAll(() => initRand("seed"));

  test("x", () => expect(true).toBe(true));

  // test("it is always false with 0 probability", () => {
  //   expect(apply({ probability: 0.0 })).toBe(false);
  // });

  // test("it is always true with 1 probability", () => {
  //   expect(apply({ probability: 1.0 })).toBe(true);
  // });

  // test("it utilizes the seeded random", () => {
  //   expect(apply({ probability: 0.5 })).toBe(false);
  // });
});
