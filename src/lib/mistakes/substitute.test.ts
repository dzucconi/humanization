import { initRand } from "../rand";
import { substitute } from "./substitute";
import { process } from "../process";

describe("#substitute", () => {
  test("swaps characters while preserving source ordering", () => {
    initRand("seed");

    const [sample] = process("sample");

    expect(substitute(sample)).toStrictEqual([
      { source: "s", transformed: ["s"] },
      { source: "a", transformed: ["a"] },
      { source: "m", transformed: ["m"] },
      { source: "p", transformed: ["l"] },
      { source: "l", transformed: ["p"] },
      { source: "e", transformed: ["e"] }
    ]);
  });

  test("swaps characters while preserving source ordering", () => {
    initRand("2");

    const [sample] = process("sample");

    expect(substitute(sample)).toStrictEqual([
      { source: "s", transformed: ["s"] },
      { source: "a", transformed: ["a"] },
      { source: "m", transformed: ["m"] },
      { source: "p", transformed: ["p"] },
      { source: "l", transformed: ["e"] },
      { source: "e", transformed: ["l"] }
    ]);
  });
});
