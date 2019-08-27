import seedrandom from "seedrandom";

import { isDefined } from "./util";

export const initRand = (seed: string | null = null) =>
  isDefined(seed) ? seedrandom(seed, { global: true }) : Math.random;

export const range = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const sample = (xs: any[]) => xs[Math.floor(Math.random() * xs.length)];
