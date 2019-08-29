import { humanize } from "./humanize";
import * as mistakes from "./mistakes";
import { process, isProcessedWord, ProcessedCharacter } from "./process";
import { Applicable } from "./apply";

const sample =
  "What kind of work do drivers perform? Which human task will AI come to record with its sensors, imitate with its statistical models, and replace with automation?";

describe("humanize", () => {
  test("default configuration", () => {
    expect(humanize(sample, { seed: "seed" }).toString()).toEqual(
      "Wah6 kind of wrok do drivsrs perffo?m Which uhman tsak ill AI come fo recodr iwth its sensors, imitat wiht igs tsatistifal moDels, adn replac iht automatiOn?"
    );
  });

  test("accepts an error configuration", () => {
    expect(
      humanize(sample, {
        seed: "seed",
        mistakes: [
          {
            apply: mistakes.capitalize,
            probability: 0.5
          }
        ]
      }).toString()
    ).toEqual(
      "WhAT KiND oF Work DO driVeRS PERfoRm? WhIch HUmAn TaSK wiLL AI COME To RecorD WItH ITS sENSorS, iMItATe wItH Its STAtISTiCAl mOdELs, AND ReplAcE wiTH AUTOmaTIoN?"
    );
  });

  test("accepts a custom function", () => {
    // TODO: A need to retain word-level sources
    const bar = (input: Applicable): Applicable => {
      if (isProcessedWord(input)) {
        return [
          // Replace entire word with "bar"
          ...process("bar")[0],
          // Leaves punctuation intact
          ...input.filter(processedCharacter =>
            /[,.?!\-]/.test(processedCharacter.source)
          )
        ];
      }
      return input;
    };
    expect(
      humanize(sample, {
        mistakes: [{ apply: bar, probability: 1 }]
      }).toString()
    ).toEqual(
      "bar bar bar bar bar bar bar? bar bar bar bar bar bar bar bar bar bar bar, bar bar bar bar bar, bar bar bar bar?"
    );
  });

  test("accepts a custom function README example", () => {
    const [thx] = process("thx");
    const print = (input: ProcessedCharacter[]) =>
      input.map(({ source }) => source).join("");

    const thanks = (input: Applicable): Applicable => {
      // Only re-write words that match 'thanks':
      if (isProcessedWord(input) && /thanks/i.test(print(input))) {
        return [
          // Replace entire word with "thx"
          ...thx,
          // Leaves punctuation intact
          ...input.filter(processedCharacter =>
            /[,.?!\-]/.test(processedCharacter.source)
          )
        ];
      }

      return input;
    };

    expect(
      humanize("hey thanks so much!", {
        seed: "1234",
        mistakes: [
          // Mistakes are applied in order from top to bottom
          { apply: mistakes.capitalize, probability: 0.5 },
          { apply: thanks, probability: 1 },
          {
            apply: input =>
              mistakes.repeat(input, {
                "!": 1,
                x: 1
              }),
            probability: 1
          }
        ]
      }).toString()
    ).toEqual("hEY thxxxxxxxxx SO mUCh!!!");
  });
});
