# humanization

[![Build Status](https://travis-ci.org/dzucconi/humanization.svg?branch=master)](https://travis-ci.org/dzucconi/humanization)

`humanization` is a library that seeks to simulate human patterns of mistakes when typing text. It can serve as a kind of ergonomic layer for automated chatbots to make them feel more human.

## Getting started

```javascript
import { humanize } from "humanization";

humanize("All their equipment and instruments are alive.");
// => "Alllllllllll their eequIpmeNT anD instuments re alivve."

humanize("Thanks so much!", {
  repetition: {
    probability: 0.1,
    type: "WORD"
  },
  // Implementing a custom "thanks" applicator
  thanks: {
    probability: 1.0,
    type: "WORD",
    apply: word => (word.toLowerCase() === "thanks" ? "thx" : word)
  }
});
// => "thx sooooooo much!"
```

## Development

- `yarn install`
- `yarn watch`

### Testing

- `yarn test` or `yarn test --watch`

### Building

- `yarn compile`
