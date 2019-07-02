interface Range {
  min: number;
  max: number;
}

interface Options {
  in: Range;
  out: Range;
}

export const remapRange = (value: number, options: Options) => {
  return (
    ((value - options.in.min) * (options.out.max - options.out.min)) /
      (options.in.max - options.in.min) +
    options.out.min
  );
};
