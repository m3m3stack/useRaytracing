export class Vector3D {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  copy() {
    const resVector = new Vector3D(this.x, this.y, this.z);
    return resVector;
  }

  multiplyScalar(scalar: number) {
    this.x = this.x * scalar;
    this.y = this.y * scalar;
    this.z = this.z * scalar;
    return this;
  }

  add(vector: Vector3D) {
    const resVector = this.copy();

    resVector.x += vector.x;
    resVector.y += vector.y;
    resVector.z += vector.z;

    return resVector;
  }

  substract(vector: Vector3D) {
    const resVector = this.copy();

    resVector.x -= vector.x;
    resVector.y -= vector.y;
    resVector.z -= vector.z;

    return resVector;
  }

  addMutable(vector: Vector3D) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;

    return this;
  }

  dot(vector: Vector3D) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  cross(vector: Vector3D) {
    const x = this.y * vector.z - this.z * vector.y;
    const y = this.z * vector.x - this.x * vector.z;
    const z = this.x * vector.y - this.y * vector.z;
    return new Vector3D(x, y, z);
  }

  magnitude() {
    return Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2),
    );
  }
}
