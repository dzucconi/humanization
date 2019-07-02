export type applicator = (input: string) => string;

export function apply(fn: applicator, input: string, probability = 0.0) {
  return Math.random() > 1.0 - probability ? fn(input) : input;
}
