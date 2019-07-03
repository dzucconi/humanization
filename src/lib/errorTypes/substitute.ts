export const substitute = (charX: string, charY: string) =>
  charY ? (charY + charX).toLowerCase() : charX;
