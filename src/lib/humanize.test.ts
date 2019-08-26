import { humanize, toString } from "./humanize";
import { capitalize } from "./mistakes";
import { process, isProcessedWord } from "./process";
import { Applicable } from "./apply";

const sample =
  "What kind of work do drivers perform? Which human task will AI come to record with its sensors, imitate with its statistical models, and replace with automation?";

describe("humanize", () => {
  test("default configuration", () => {
    expect(toString(humanize(sample, undefined, { seed: "seed" }))).toEqual(
      "Wah6 kind of wrok do drivsrs perffo?m Which uhman tsak ill AI come fo recodr iwth its sensors, imitat wiht igs tsatistifal moDels, adn replac iht automatiOn?"
    );
  });

  test("accepts an error configuration", () => {
    expect(
      toString(
        humanize(
          sample,
          [
            {
              apply: capitalize,
              probability: 0.5
            }
          ],
          {
            seed: "seed"
          }
        )
      )
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
            /[,.?\-]/.test(processedCharacter.source)
          )
        ];
      }
      return input;
    };
    expect(
      toString(humanize(sample, [{ apply: bar, probability: 1 }]))
    ).toEqual(
      "bar bar bar bar bar bar bar? bar bar bar bar bar bar bar bar bar bar bar, bar bar bar bar bar, bar bar bar bar?"
    );
  });
});
