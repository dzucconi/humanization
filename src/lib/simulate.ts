const randRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

interface Stroke {
  character: string;
  pause: number;
}

interface GenerateStrokes {
  message: string;
  pauseMin?: number;
  pauseMax?: number;
}

export const generateStrokes = ({
  message,
  pauseMin = 15,
  pauseMax = 250
}: GenerateStrokes): Stroke[] => {
  const strokes = message.split("").map(character => ({
    character,
    pause: randRange(pauseMin, pauseMax)
  }));

  return strokes;
};

interface SimulateTyping extends GenerateStrokes {
  onCharacter(character: string): void;
}

export const simulateTyping = ({
  message,
  onCharacter,
  pauseMin = 15,
  pauseMax = 250
}: SimulateTyping) => {
  return generateStrokes({ message, pauseMin, pauseMax }).reduce(
    (promise, stroke) => {
      return promise.then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            onCharacter(stroke.character);
            resolve();
          }, stroke.pause);
        });
      });
    },
    Promise.resolve(true)
  );
};
