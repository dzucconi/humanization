# humanization

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![npm](https://img.shields.io/npm/v/humanization)](https://www.npmjs.com/package/humanization) [![Build Status](https://travis-ci.org/dzucconi/humanization.svg?branch=master)](https://travis-ci.org/dzucconi/humanization)

`humanization` is a library that seeks to simulate human patterns of mistakes when typing text. It can be thought of as a way of 'distressing' text or serve as a kind of ergonomic layer for automated chatbots to make them feel more human.

## Getting started

```javascript
import { humanize } from "humanization";

humanize("All their equipment and instruments are alive.").toString();
// => "All thei5 eqjipmetn and insfrmuents rAe alIve."
```

```javascript
import {
  humanize,
  mistakes,
  process,
  isProcessedWord,
  ProcessedCharacter,
  Applicable
} from "humanization";

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
}).toString();
// => "hEY thxxxxxxxxx SO mUCh!!!"
```

## Development

- `yarn install`
- `yarn watch`

### Testing

- `yarn test` or `yarn test --watch`

### Building

- `yarn compile`
