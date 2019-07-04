export type Applicator = (input: string) => string;

export function apply(fn: Applicator, input: string, probability = 0.0) {
  return Math.random() > 1.0 - probability ? fn(input) : input;
}
