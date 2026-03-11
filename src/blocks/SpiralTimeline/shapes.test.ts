import * as d3 from "d3";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";
import { drawShape } from "./shapes.ts";
import type { NodeShape } from "./types.ts";

/**
 * Helper: creates a fresh SVG <g> element wrapped in a D3 selection,
 * suitable for passing to drawShape.
 */
function createGroup() {
  const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
  const doc = dom.window.document;
  const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
  const g = doc.createElementNS("http://www.w3.org/2000/svg", "g");
  svg.appendChild(g);
  doc.body.appendChild(svg);
  return d3.select(g as unknown as SVGGElement);
}

const SIZE = 20;
const COLOR = "#ff0000";

describe("drawShape", () => {
  it("circle: appends a <circle> with correct r, stroke, and no fill", () => {
    const g = createGroup();
    drawShape(g, "circle", SIZE, COLOR);

    const circle = g.select("circle");
    expect(circle.empty()).toBe(false);
    expect(circle.attr("r")).toBe(String(SIZE / 2));
    expect(circle.attr("fill")).toBe("none");
    expect(circle.attr("stroke")).toBe(COLOR);
    expect(circle.attr("stroke-width")).toBe("2");
  });

  it("square: appends a <rect> centered at origin with correct dimensions", () => {
    const g = createGroup();
    drawShape(g, "square", SIZE, COLOR);

    const rect = g.select("rect");
    expect(rect.empty()).toBe(false);
    expect(rect.attr("x")).toBe(String(-SIZE / 2));
    expect(rect.attr("y")).toBe(String(-SIZE / 2));
    expect(rect.attr("width")).toBe(String(SIZE));
    expect(rect.attr("height")).toBe(String(SIZE));
    expect(rect.attr("fill")).toBe("none");
    expect(rect.attr("stroke")).toBe(COLOR);
  });

  it("triangle: appends a <polygon> with 3 vertices", () => {
    const g = createGroup();
    drawShape(g, "triangle", SIZE, COLOR);

    const polygon = g.select("polygon");
    expect(polygon.empty()).toBe(false);
    const points = polygon.attr("points").split(" ");
    expect(points).toHaveLength(3);
    expect(polygon.attr("fill")).toBe("none");
    expect(polygon.attr("stroke")).toBe(COLOR);
  });

  it("star: appends a <polygon> with 10 vertices (5 outer + 5 inner)", () => {
    const g = createGroup();
    drawShape(g, "star", SIZE, COLOR);

    const polygon = g.select("polygon");
    expect(polygon.empty()).toBe(false);
    const points = polygon.attr("points").split(" ");
    expect(points).toHaveLength(10);
    expect(polygon.attr("fill")).toBe("none");
    expect(polygon.attr("stroke")).toBe(COLOR);
  });

  it("pentagon: appends a <polygon> with 5 vertices", () => {
    const g = createGroup();
    drawShape(g, "pentagon", SIZE, COLOR);

    const polygon = g.select("polygon");
    expect(polygon.empty()).toBe(false);
    const points = polygon.attr("points").split(" ");
    expect(points).toHaveLength(5);
    expect(polygon.attr("fill")).toBe("none");
    expect(polygon.attr("stroke")).toBe(COLOR);
  });

  it("each shape type appends exactly one child element", () => {
    const shapes: NodeShape[] = ["circle", "square", "triangle", "star", "pentagon"];
    for (const shape of shapes) {
      const g = createGroup();
      drawShape(g, shape, SIZE, COLOR);
      expect(g.selectAll("*").size()).toBe(1);
    }
  });

  it("all shapes use stroke-width 2", () => {
    const shapes: NodeShape[] = ["circle", "square", "triangle", "star", "pentagon"];
    for (const shape of shapes) {
      const g = createGroup();
      drawShape(g, shape, SIZE, COLOR);
      const child = g.select("*");
      expect(child.attr("stroke-width")).toBe("2");
    }
  });
});
