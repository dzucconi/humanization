import seedrandom from "seedrandom";

import { isDefined } from "./util";

export const initRand = (seed: string | null = null) =>
  isDefined(seed) ? seedrandom(seed, { global: true }) : Math.random;
