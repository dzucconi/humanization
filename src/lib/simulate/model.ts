// TODO: Consider a more accurate simulation based on recordings of typing sessions.
// Need to come up with a decent sample text to capture this information with.

// prettier-ignore
export const SAMPLE_MODEL: { [character: string ]: number[] } = {
  '"': [577, 97, 145, 96, 97],
  " ": [935, 119, 143, 119, 142, 119, 95, 94, 119, 168, 143, 103, 143, 192, 167, 694, 144, 25, 144, 120, 214, 72, 143, 118, 143, 191, 119, 167, 119, 119, 146, 383, 408, 119, 119, 71, 118, 168, 167, 359, 166, 95, 71, 47, 118, 71, 71, 95, 72, 95, 335, 46, 143, 97, 119, 191, 287, 93, 71, 119, 72, 190, 143, 119, 71, 143, 94, 119],
  ",": [167, 287, 143],
  ":": [72],
  ".": [96, 173, 415, 142],
  "'": [238],
  "(": [96, 72],
  ")": [72, 72],
  "1": [527],
  "2": [430],
  "3": [384],
  "9": [169],
  A: [72, 193, 143, 287],
  a: [95, 191, 142, 119, 216, 287, 143, 165, 141, 143, 166, 119, 168, 239, 791, 143, 167, 119],
  b: [527, 144, 215, 911, 191, 96, 142],
  c: [96, 95, 121, 168, 95, 95, 71, 119, 455],
  D: [145],
  d: [95, 167, 215, 94, 287, 167, 70, 47, 167, 143, 190, 215, 191, 168],
  e: [119, 97, 214, 189, 72, 95, 119, 48, 71, 95, 167, 71, 167, 238, 143, 151, 71, 169, 95, 119, 333, 95, 167, 118, 191],
  F: [73],
  f: [95, 143, 49, 286, 142, 72, 431, 95],
  g: [143, 93, 71, 143, 95, 359, 95, 143],
  h: [167, 166, 71, 120, 360, 719, 71, 695],
  I: [121],
  i: [190, 119, 120, 167, 95, 143, 191, 143, 72, 214, 216, 71, 95, 167, 70, 47, 167, 167, 335, 143, 503],
  j: [143, 360, 287],
  J: [263],
  k: [47, 128, 47, 215, 95, 383],
  l: [143, 119, 143, 168, 191, 167, 143, 526, 144, 216, 198, 167],
  L: [73],
  m: [97, 95, 360, 165, 95, 72, 71, 167, 47, 200],
  n: [335, 191, 121, 72, 143, 95, 95, 120, 70, 71, 47, 120, 95, 95, 95, 95],
  N: [72],
  o: [95, 167, 143, 48, 143, 143, 143, 120, 96, 94, 265, 165, 526, 190, 167, 143, 48, 167, 143, 142, 119, 72, 119, 94],
  P: [167, 120],
  p: [193, 119, 143, 337, 191, 238, 71],
  q: [127, 215, 215, 143],
  r: [95, 119, 95, 121, 95, 167, 24, 119, 167, 119, 143, 167, 95],
  s: [214, 193, 95, 95, 166, 191, 190, 382, 95, 167, 119, 167, 167, 215, 71, 71, 93, 192, 95],
  S: [239, 360, 263, 146],
  T: [144],
  t: [192, 95, 119, 215, 167, 167, 95, 191, 192, 119, 95, 71, 119, 142, 143, 191, 167],
  U: [168],
  u: [72, 167, 119, 144, 119, 120, 286, 191, 47, 95, 143, 190],
  v: [71, 70, 312, 96, 95],
  w: [119, 119, 71, 118, 239, 383],
  W: [121, 72],
  X: [193],
  x: [263, 119, 122, 191, 215],
  y: [191, 71, 96, 431, 215, 95, 167, 191, 118],
  z: [191, 287, 129, 238],
  Backspace: [335, 407, 263, 286, 335, 263, 287],
  Enter: [766, 863],
  Shift: [334, 478, 118, 262, 215, 334, 94, 190, 288, 246, 142, 622, 69, 261, 165, 141, 94, 166, 141, 23, 214, 23, 20, 142, 287, 141, 286]
};
