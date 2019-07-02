import { humanize } from "./humanize";

const sample =
  "What kind of work do drivers perform? Which human task will AI come to record with its sensors, imitate with its statistical models, and replace with automation?";

describe("humanize", () => {
  test("default configuration", () => {
    expect(humanize(sample, undefined, { seed: "seed" })).toEqual(
      "What oind of work do drivers percorm? WhICh hhuumman tasK ill AI come to reccor With itz sensors, iimitae withhhhh itts stAtistiCal Jodels, aamd replaceee wii6H automaion?"
    );
  });

  test("accepts an error configuration", () => {
    expect(
      humanize(
        sample,
        {
          repetition: {
            probability: 0.2,
            type: "WORD"
          }
        },
        {
          seed: "seed"
        }
      )
    ).toEqual(
      "What kinddd of work do drivers perform??? Which human task will AI come to record with its sensors, imitate with its statistical models, and replace withhh automation?"
    );
  });

  test("accepts a custom function", () => {
    expect(
      humanize(sample, {
        foo: {
          type: "WORD",
          probability: 1,
          function: word => word.replace(/(\w+)/g, "bar")
        }
      })
    ).toEqual(
      "bar bar bar bar bar bar bar? bar bar bar bar bar bar bar bar bar bar bar, bar bar bar bar bar, bar bar bar bar?"
    );
  });
});
