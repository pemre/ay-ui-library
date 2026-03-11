import type {
  AnimationConfig,
  FogConfig,
  RingGradientConfig,
  SpiralTimelineLabels,
  TypeConfig,
  YearLabelPosition,
  ZoomConfig,
} from "./types.ts";

export const DEFAULT_CONFIG: {
  yearsToShow: number;
  yearLabelPosition: YearLabelPosition;
  zoom: ZoomConfig;
  fog: FogConfig;
  ringGradient: RingGradientConfig;
  animations: AnimationConfig;
  types: TypeConfig[];
  labels: Required<SpiralTimelineLabels>;
} = {
  yearsToShow: 2,
  yearLabelPosition: "top",
  zoom: {
    speed: 1.0,
    mouseWheel: true,
    slider: true,
    buttons: true,
  },
  fog: {
    enabled: true,
    startRing: 2,
    intensity: 0.8,
  },
  ringGradient: {
    enabled: true,
    scale: "spectral",
    applyTo: ["grid", "labels"],
  },
  animations: {
    enabled: true,
    duration: 400,
  },
  types: [{ key: "default", color: "#38bdf8", shape: "circle" }],
  labels: {
    zoomTitle: "Years to Show",
    zoomSliderLabel: "Year Count",
    zoomValueTemplate: "{count} years shown ({start}–{end})",
    timeWindowTitle: "Time Window",
    ringSummaryTemplate: "Spiral: {rings} rings + tail",
    totalYearsTemplate: "Total data: {years} years",
  },
};
