import { initRand } from "./rand";
import { apply, applicator } from "./apply";
import * as errorTypes from "../errorTypes";

const VALID_ERROR_TYPES: { [key: string]: string } = {
  omission: "omit",
  duplication: "duplicate",
  repetition: "repeat",
  substitution: "substitute",
  transposition: "transpose", // todo
  miss: "miss",
  misCased: "toggleCase", // rename?
  capitalized: "capitalize"
};

interface ErrorConfiguration {
  probability: number;
  type: "CHARACTER" | "WORD";
  function?: (input: string) => string;
}

interface ErrorsConfiguration {
  [name: string]: ErrorConfiguration;
}

const SAMPLE_ERROR_CONFIGURATION: ErrorsConfiguration = {
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
  errorConfiguration: ErrorsConfiguration = SAMPLE_ERROR_CONFIGURATION,
  options: { seed?: string } = {}
) {
  initRand(options.seed);

  return Object.entries(errorConfiguration).reduce(
    (transformedString, [errorType, errorConfiguration]) => {
      const errorFn: applicator =
        (errorTypes as any)[VALID_ERROR_TYPES[errorType]] ||
        errorConfiguration.function;

      if (!errorFn) {
        throw new Error(
          `missing \`errorFn\` for ${errorType}:${JSON.stringify(
            errorConfiguration
          )}`
        );
      }

      return (
        transformedString
          // Apply word-level errors
          .split(" ")
          .map(word => {
            if (errorConfiguration.type === "WORD") {
              return apply(errorFn, word, errorConfiguration.probability);
            }

            return word;
          })
          .join(" ")
          // Apply char-level errors
          .split("")
          .map(char => {
            if (
              errorConfiguration.type === "CHARACTER" &&
              !IGNORED_CHARACTERS.includes(char)
            ) {
              return apply(errorFn, char, errorConfiguration.probability);
            }
            return char;
          })
          .join("")
      );
    },
    string
  );
}
