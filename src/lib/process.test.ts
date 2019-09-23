import { process } from "./process";

describe("#process", () => {
  test("tokenizes strings into ProcessedWord/ProcessedCharacters", () => {
    expect(process("hello world")).toStrictEqual([
      [
        { source: "h", transformed: ["h"] },
        { source: "e", transformed: ["e"] },
        { source: "l", transformed: ["l"] },
        { source: "l", transformed: ["l"] },
        { source: "o", transformed: ["o"] }
      ],
      [
        { source: "w", transformed: ["w"] },
        { source: "o", transformed: ["o"] },
        { source: "r", transformed: ["r"] },
        { source: "l", transformed: ["l"] },
        { source: "d", transformed: ["d"] }
      ]
    ]);
  });

  test("handles template strings", () => {
    const processed = process(`
      hello world
    `);

    expect(processed).toStrictEqual([
      [{ source: "\n", transformed: ["\n"] }],
      [{ source: "", transformed: [""] }],
      [{ source: "", transformed: [""] }],
      [{ source: "", transformed: [""] }],
      [{ source: "", transformed: [""] }],
      [{ source: "", transformed: [""] }],
      [
        { source: "h", transformed: ["h"] },
        { source: "e", transformed: ["e"] },
        { source: "l", transformed: ["l"] },
        { source: "l", transformed: ["l"] },
        { source: "o", transformed: ["o"] }
      ],
      [
        { source: "w", transformed: ["w"] },
        { source: "o", transformed: ["o"] },
        { source: "r", transformed: ["r"] },
        { source: "l", transformed: ["l"] },
        { source: "d", transformed: ["d"] },
        { source: "\n", transformed: ["\n"] }
      ],
      [{ source: "", transformed: [""] }],
      [{ source: "", transformed: [""] }],
      [{ source: "", transformed: [""] }],
      [{ source: "", transformed: [""] }]
    ]);
  });
});
