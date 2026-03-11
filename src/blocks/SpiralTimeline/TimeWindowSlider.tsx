import { useCallback, useEffect, useRef } from "react";
import type { SpiralTimelineLabels } from "./types.ts";

export interface TimeWindowSliderProps {
  /** Earliest year in the dataset. */
  dataMinYear: number;
  /** Latest year in the dataset. */
  dataMaxYear: number;
  /** Number of years currently visible on the spiral. */
  yearsToShow: number;
  /** First year of the visible window. */
  windowStart: number;
  /** Localized label strings. */
  labels: Required<SpiralTimelineLabels>;
  /** Called when the user drags or clicks to change the window start. */
  onWindowStartChange: (newStart: number) => void;
}

export function TimeWindowSlider({
  dataMinYear,
  dataMaxYear,
  yearsToShow,
  windowStart,
  labels,
  onWindowStartChange,
}: TimeWindowSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartWindowStart = useRef(0);

  const totalDataYears = Math.max(1, dataMaxYear - dataMinYear + 1);
  const windowEnd = windowStart + yearsToShow - 1;
  const windowWidthPercent = (yearsToShow / totalDataYears) * 100;
  const windowLeftPercent = ((windowStart - dataMinYear) / totalDataYears) * 100;

  const clampStart = useCallback(
    (value: number) => Math.max(dataMinYear, Math.min(dataMaxYear - yearsToShow + 1, value)),
    [dataMinYear, dataMaxYear, yearsToShow],
  );

  /* ── Drag handling ── */
  const handleWindowMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      dragStartX.current = e.clientX;
      dragStartWindowStart.current = windowStart;
      document.body.style.cursor = "grabbing";
      e.preventDefault();
    },
    [windowStart],
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current) return;
      const trackWidth = trackRef.current.getBoundingClientRect().width;
      const dx = e.clientX - dragStartX.current;
      const yearsDelta = Math.round((dx / trackWidth) * totalDataYears);
      onWindowStartChange(clampStart(dragStartWindowStart.current + yearsDelta));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [totalDataYears, clampStart, onWindowStartChange]);

  /* ── Track click → center window on clicked position ── */
  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickPercent = (e.clientX - rect.left) / rect.width;
      const clickedYear = dataMinYear + clickPercent * totalDataYears;
      onWindowStartChange(clampStart(Math.round(clickedYear - yearsToShow / 2)));
    },
    [dataMinYear, totalDataYears, yearsToShow, clampStart, onWindowStartChange],
  );

  /* ── Tick marks ── */
  const tickYears: number[] = [];
  for (let y = dataMinYear; y <= dataMaxYear; y++) {
    tickYears.push(y);
  }

  const rangeLabel =
    windowStart === windowEnd ? String(windowStart) : `${windowStart}\u2013${windowEnd}`;

  const ringSummary = labels.ringSummaryTemplate.replace("{rings}", String(yearsToShow + 1));
  const totalSummary = labels.totalYearsTemplate.replace("{years}", String(totalDataYears));

  return (
    <div className="spiral-timeline__slider">
      <div className="spiral-timeline__slider-header">
        <span>{labels.timeWindowTitle}</span>
        <span>
          {windowStart} — {windowEnd}
        </span>
      </div>

      {/* biome-ignore lint/a11y/noStaticElementInteractions: track click is supplementary to the draggable slider */}
      <div
        className="spiral-timeline__slider-track"
        ref={trackRef}
        onClick={handleTrackClick}
        role="presentation"
      >
        <div className="spiral-timeline__slider-ticks">
          {tickYears.map((y) => {
            const leftPct = ((y - dataMinYear + 0.5) / totalDataYears) * 100;
            return (
              <div key={y} className="spiral-timeline__slider-tick" style={{ left: `${leftPct}%` }}>
                <div className="spiral-timeline__slider-tick-label">{y}</div>
              </div>
            );
          })}
        </div>

        {/* Draggable window indicator */}
        <div
          className="spiral-timeline__slider-window"
          style={{ left: `${windowLeftPercent}%`, width: `${windowWidthPercent}%` }}
          onMouseDown={handleWindowMouseDown}
          role="slider"
          aria-label={labels.timeWindowTitle}
          aria-valuemin={dataMinYear}
          aria-valuemax={dataMaxYear}
          aria-valuenow={windowStart}
          aria-valuetext={rangeLabel}
          tabIndex={0}
        >
          <div className="spiral-timeline__slider-window-label">{rangeLabel}</div>
        </div>
      </div>

      <div className="spiral-timeline__slider-info">
        <span>{ringSummary}</span>
        <span>{totalSummary}</span>
      </div>
    </div>
  );
}
