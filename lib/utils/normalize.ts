export const normalizeScreenDimensions = (
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const nx = (x / width) * 2 - 1;
  const ny = 1 - (y / height) * 2;

  return [nx, ny];
};
