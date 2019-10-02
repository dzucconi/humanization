// TODO: Create function applicators for words/characters to reduce boilerplate

export interface ProcessedCharacter {
  source: string;
  transformed: string[];
}

export type ProcessedWord = ProcessedCharacter[];
export type ProcessedStream = ProcessedWord[];

export const isProcessedWord = (
  processedInput: ProcessedWord | ProcessedCharacter
): processedInput is ProcessedWord => {
  return Array.isArray(processedInput);
};

export const isProcessedCharacter = (
  processedInput: ProcessedWord | ProcessedCharacter
): processedInput is ProcessedCharacter => {
  return !Array.isArray(processedInput);
};

export const process = (inputString: string): ProcessedStream => {
  const words = inputString
    .split(" ")
    .filter(word => word !== "")
    .map(word => word.split(""))
    .filter(Boolean);

  return words.map(word => {
    return word.map(character => {
      return {
        source: character,
        transformed: [character]
      };
    });
  });
};

export const toString = (stream: ProcessedStream): string =>
  stream
    .map(word => word.map(char => char.transformed.join("")).join(""))
    .join(" ");
