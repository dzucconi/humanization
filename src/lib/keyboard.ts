export type Character =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "0"
  | "-"
  | "="
  | "q"
  | "w"
  | "e"
  | "r"
  | "t"
  | "y"
  | "u"
  | "i"
  | "o"
  | "p"
  | "["
  | "]"
  | "\\"
  | "a"
  | "s"
  | "d"
  | "f"
  | "g"
  | "h"
  | "j"
  | "k"
  | "l"
  | ";"
  | "'"
  | "z"
  | "x"
  | "c"
  | "v"
  | "b"
  | "n"
  | "m"
  | ","
  | "."
  | "/"
  | "!"
  | "@"
  | "#"
  | "$"
  | "%"
  | "^"
  | "&"
  | "*"
  | "("
  | ")"
  | "_"
  | "+"
  | "Q"
  | "W"
  | "E"
  | "R"
  | "T"
  | "Y"
  | "U"
  | "I"
  | "O"
  | "P"
  | "{"
  | "}"
  | "|"
  | "A"
  | "S"
  | "D"
  | "F"
  | "G"
  | "H"
  | "J"
  | "K"
  | "L"
  | ":"
  | '"'
  | "Z"
  | "X"
  | "C"
  | "V"
  | "B"
  | "N"
  | "M"
  | "<"
  | ">"
  | "?";

export interface Layout {
  [key: string]: {
    neighbors: Character[];
  };
}

export type Keymap = string[][];

export const buildLayout = (xs: Keymap) =>
  xs.reduce((memo, row, rowIndex) => {
    return {
      ...memo,
      ...row.reduce((acc, key, keyIndex) => {
        const aboveRow = DEFAULT_KEYMAP[rowIndex - 1];
        const belowRow = DEFAULT_KEYMAP[rowIndex + 1];

        return {
          ...acc,
          [key]: {
            neighbors: [
              // Above
              aboveRow && aboveRow[keyIndex],
              aboveRow && aboveRow[keyIndex + 1],
              // Left
              row[keyIndex - 1],
              // Right
              row[keyIndex + 1],
              // Below
              belowRow && belowRow[keyIndex - 1],
              belowRow && belowRow[keyIndex]
            ].filter(Boolean)
          }
        };
      }, {})
    };
  }, {});

export const DEFAULT_KEYMAP = [
  "1 2 3 4 5 6 7 8 9 0 - =".split(" "),
  "q w e r t y u i o p [ ] \\".split(" "),
  "a s d f g h j k l ; '".split(" "),
  "z x c v b n m , . /".split(" ")
];

export const SHIFT_KEYMAP = [
  "! @ # $ % ^ & * ( ) _ +".split(" "),
  "Q W E R T Y U I O P { } |".split(" "),
  'A S D F G H J K L : "'.split(" "),
  "Z X C V B N M < > ?".split(" ")
];

export const LAYOUT: {
  default: Layout;
  shift: Layout;
} = {
  default: buildLayout(DEFAULT_KEYMAP),
  shift: buildLayout(SHIFT_KEYMAP)
};

export const neighborsOf = (key: Character): Character[] => {
  const char = LAYOUT.default[key];

  if (char) {
    return LAYOUT.default[key].neighbors;
  }

  return [];
};
