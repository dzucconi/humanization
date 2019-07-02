import { neighborsOf } from "./keyboard";

describe("keyboard", () => {
  describe("#neighborsOf", () => {
    test("should return for a given key: f", () => {
      expect(neighborsOf("f")).toEqual(["r", "t", "d", "g", "c", "v"]);
    });

    test("should return for a given key: m", () => {
      expect(neighborsOf("m")).toEqual(["j", "k", "n", ","]);
    });

    test("should return for a given key: y", () => {
      expect(neighborsOf("y")).toEqual(["6", "7", "t", "u", "g", "h"]);
    });
  });
});
