import { initRand } from "./rand";
import { apply, Applicator } from "./apply";
import * as mistakes from "./mistakes";

const VALID_MISTAKE_TYPES: { [key: string]: string } = {
  omission: "omit",
  duplication: "duplicate",
  repetition: "repeat",
  substitution: "substitute",
  transposition: "transpose", // todo
  miss: "miss",
  misCased: "toggleCase", // rename?
  capitalized: "capitalize"
};

interface MistakeConfiguration {
  probability: number;
  type: "CHARACTER" | "WORD";
  apply?: (input: string) => string;
}

interface MistakesConfiguration {
  [name: string]: MistakeConfiguration;
}

const SAMPLE_MISTAKE_CONFIGURATION: MistakesConfiguration = {
  miss: {
    probability: 0.033,
    type: "CHARACTER"
  },
  omission: {
    probability: 0.033,
    type: "CHARACTER"
  },
  duplication: {
    probability: 0.033,
    type: "CHARACTER"
  },
  substitution: {
    probability: 0.033,
    type: "CHARACTER"
  },
  transposition: {
    probability: 0.033,
    type: "CHARACTER"
  },
  misCased: {
    probability: 0.033,
    type: "CHARACTER"
  },
  capitalized: {
    probability: 0.033,
    type: "CHARACTER"
  },
  repetition: {
    probability: 0.1,
    type: "WORD"
  }
};

const IGNORED_CHARACTERS = [" "];

export function humanize(
  string: string,
  mistakeConfiguration: MistakesConfiguration = SAMPLE_MISTAKE_CONFIGURATION,
  options: { seed?: string } = {}
) {
  initRand(options.seed);

  return Object.entries(mistakeConfiguration).reduce(
    (transformedString, [mistake, mistakeConfiguration]) => {
      const applicator: Applicator =
        (mistakes as any)[VALID_MISTAKE_TYPES[mistake]] ||
        mistakeConfiguration.apply;

      if (!applicator) {
        throw new Error(
          `missing \`applicator\` for ${mistake}:${JSON.stringify(
            mistakeConfiguration
          )}`
        );
      }

      return (
        transformedString
          // Apply word-level mistakes
          .split(" ")
          .map(word => {
            if (mistakeConfiguration.type === "WORD") {
              return apply(applicator, word, mistakeConfiguration.probability);
            }

            return word;
          })
          .join(" ")
          // Apply char-level mistakes
          .split("")
          .map(char => {
            if (
              mistakeConfiguration.type === "CHARACTER" &&
              !IGNORED_CHARACTERS.includes(char)
            ) {
              return apply(applicator, char, mistakeConfiguration.probability);
            }
            return char;
          })
          .join("")
      );
    },
    string
  );
}
