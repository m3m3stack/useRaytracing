import { Box } from "./box";
import { Vector3D } from "./vectors";

export const computeShadowForBox = (light: Vector3D, box: Box) => {
  const lightToBoxCenter = light.substract(box.position);

  const centerShadowOffset = computeShadowOffsetForPosition(
    lightToBoxCenter,
    box.position,
  );

  const cornerShadows = box.corners.map((corner) =>
    computeShadowOffsetForPosition(lightToBoxCenter, corner),
  );
  const dist = light.substract(box.position).magnitude();
  const blur = Math.min(100, (box.width / dist) * 1);

  return { offsets: [centerShadowOffset, ...cornerShadows], blur };
};

export const computeShadowOffsetForPosition = (
  light: Vector3D,
  position: Vector3D,
) => {
  const scalingFactor = -position.z / (light.z - position.z);
  const shadowX = position.x + scalingFactor * (light.x - position.x);
  const shadowY = position.y + scalingFactor * (light.y - position.y);

  return new Vector3D(shadowX, shadowY, 0);
};
