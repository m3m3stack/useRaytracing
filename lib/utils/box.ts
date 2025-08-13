import { normalizeScreenDimensions } from "./normalize";
import { Vector3D } from "./vectors";

export type Corner = {
  x: number;
  y: number;
  z: number;
};

export class Box {
  position: Vector3D;
  width: number;
  height: number;
  depth: number;
  corners: Vector3D[];

  constructor(
    position: Vector3D,
    width: number,
    height: number,
    depth: number,
  ) {
    this.position = position.copy();
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.computeCorners();
  }

  static fromHTMLElement(element: HTMLElement, depth: number) {
    const [nx, ny] = normalizeScreenDimensions(
      element.clientLeft,
      element.clientTop,
      window.innerWidth,
      window.innerHeight,
    );

    const [w, h] = normalizeScreenDimensions(
      element.clientLeft,
      element.clientTop,
      window.innerWidth,
      window.innerHeight,
    );

    const center = new Vector3D(nx, ny, depth);

    return new Box(center, w, h, depth);
  }

  computeCorners() {
    const hw = this.width / 2;
    const hh = this.height / 2;
    const hd = this.depth / 2;

    this.corners = [
      new Vector3D(
        this.position.x - hw,
        this.position.y - hh,
        this.position.z - hd,
      ),
      new Vector3D(
        this.position.x + hw,
        this.position.y - hh,
        this.position.z - hd,
      ),
      new Vector3D(
        this.position.x + hw,
        this.position.y + hh,
        this.position.z - hd,
      ),
      new Vector3D(
        this.position.x - hw,
        this.position.y + hh,
        this.position.z - hd,
      ),
      new Vector3D(
        this.position.x - hw,
        this.position.y - hh,
        this.position.z + hd,
      ),
      new Vector3D(
        this.position.x + hw,
        this.position.y - hh,
        this.position.z + hd,
      ),
      new Vector3D(
        this.position.x + hw,
        this.position.y + hh,
        this.position.z + hd,
      ),
      new Vector3D(
        this.position.x - hw,
        this.position.y + hh,
        this.position.z + hd,
      ),
    ];
  }
}
