import { normalizeScreenDimensions } from "./normalize";
import { Vector3D } from "./vectors";

export const canvasToLightVectorOnSphere = (
  radius: number,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  const [nx, ny] = normalizeScreenDimensions(x, y, width, height);
  const azimuth = xToAzimuth(nx);
  const elevation = yToElevation(ny);
  const sphereX = radius * Math.cos(azimuth) * Math.cos(elevation);
  const sphereY = radius * Math.sin(elevation);
  const sphereZ = radius * Math.sin(azimuth) * Math.cos(elevation);

  return new Vector3D(sphereX, sphereY, sphereZ);
};

export const computeBoxShadowOffset = () => {};

export const xToAzimuth = (x: number) => {
  const azimuth = x * Math.PI;
  return azimuth;
};
export const yToElevation = (y: number) => {
  const elevation = y * Math.PI;
  return elevation;
};
