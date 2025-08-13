import { Box } from "./utils/box";
import { computeShadowForBox } from "./utils/shadows";
import { canvasToLightVectorOnSphere } from "./utils/sphere";

class RaytracingClient {
  overlayCanvas: HTMLCanvasElement;
  elements: HTMLElement[] = [];
  currentMousePosition: [number, number];
  constructor(canvas: HTMLCanvasElement) {
    this.overlayCanvas = canvas;
  }

  setMousePosition(x: number, y: number) {
    this.currentMousePosition = [x, y];
  }

  addTarget(element: HTMLElement) {
    this.elements.push(element);
  }

  raytrace() {
    const ctx = this.overlayCanvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    this.elements.forEach((element) => {
      const box = Box.fromHTMLElement(element, 2);
      const lightVector = canvasToLightVectorOnSphere(
        window.innerWidth,
        this.currentMousePosition[0],
        this.currentMousePosition[1],
        window.innerWidth,
        window.innerHeight,
      );
      const { offsets, blur } = computeShadowForBox(lightVector, box);
      const [centerShadowOffset, ...shadowCorners] = offsets;

      ctx.beginPath();
      ctx.moveTo(shadowCorners[0].x, shadowCorners[0].y);
      for (let i = 1; i < 4; i++) {
        ctx.lineTo(shadowCorners[i].x, shadowCorners[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = blur; // optional for soft shadow
    });
  }
}

export const useRaytracing = (client: RaytracingClient) => {
  window.addEventListener("mousemove", (event) => {
    const x = event.clientX; // X position relative to viewport
    const y = event.clientY; // Y position relative to viewport
    client.setMousePosition(x, y);
  });
};
