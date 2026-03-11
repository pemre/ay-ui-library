import type { Selection } from "d3";
import type { NodeShape } from "./types.ts";

/**
 * Appends the correct SVG shape element to a D3 selection based on the
 * given shape type. All shapes are stroke-only (no fill), centered at (0, 0).
 */
export function drawShape(
  selection: Selection<SVGGElement, unknown, null, undefined>,
  shape: NodeShape,
  size: number,
  color: string,
): void {
  const s = size / 2;

  switch (shape) {
    case "circle":
      selection
        .append("circle")
        .attr("r", s)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2);
      break;

    case "square":
      selection
        .append("rect")
        .attr("x", -s)
        .attr("y", -s)
        .attr("width", s * 2)
        .attr("height", s * 2)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2);
      break;

    case "triangle": {
      const points: [number, number][] = [
        [0, -s],
        [s * 0.866, s * 0.5],
        [-s * 0.866, s * 0.5],
      ];
      selection
        .append("polygon")
        .attr("points", points.map((p) => p.join(",")).join(" "))
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2);
      break;
    }

    case "star": {
      const starPoints: [number, number][] = [];
      for (let i = 0; i < 10; i++) {
        const angle = (i * Math.PI) / 5 - Math.PI / 2;
        const r = i % 2 === 0 ? s : s * 0.4;
        starPoints.push([r * Math.cos(angle), r * Math.sin(angle)]);
      }
      selection
        .append("polygon")
        .attr("points", starPoints.map((p) => p.join(",")).join(" "))
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2);
      break;
    }

    case "pentagon": {
      const pentPoints: [number, number][] = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        pentPoints.push([s * Math.cos(angle), s * Math.sin(angle)]);
      }
      selection
        .append("polygon")
        .attr("points", pentPoints.map((p) => p.join(",")).join(" "))
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2);
      break;
    }
  }
}
