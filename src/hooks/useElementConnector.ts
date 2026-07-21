import { type RefObject, useLayoutEffect, useState } from "react";

export interface ElementConnectorGeometry {
  width: number;
  height: number;
  path: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

interface UseElementConnectorOptions {
  activeIndex: number;
  containerRef: RefObject<HTMLElement | null>;
  sourceRefs: RefObject<Array<HTMLElement | null>>;
  targetRef: RefObject<HTMLElement | null>;
}

const DESKTOP_CONNECTOR_QUERY = "(min-width: 1024px)";
const CONNECTOR_PORT_OFFSET = 6;
const MINIMUM_CONTROL_DISTANCE = 24;

function measureConnector(
  container: HTMLElement,
  source: HTMLElement,
  target: HTMLElement,
): ElementConnectorGeometry | null {
  const containerBounds = container.getBoundingClientRect();
  const sourceBounds = source.getBoundingClientRect();
  const targetBounds = target.getBoundingClientRect();
  // Clip-path slabs are narrower than their bounding box at mid-height;
  // data-connector-edge-inset carries that fraction so the port sits on
  // the visible edge.
  const edgeInset =
    Number.parseFloat(source.dataset.connectorEdgeInset ?? "0") || 0;
  const startX =
    sourceBounds.right
    - containerBounds.left
    - sourceBounds.width * edgeInset
    + CONNECTOR_PORT_OFFSET;
  const startY = sourceBounds.top - containerBounds.top + sourceBounds.height / 2;
  const endX = targetBounds.left - containerBounds.left + targetBounds.width / 2;
  const endY = targetBounds.top - containerBounds.top + targetBounds.height / 2;

  if (endX <= startX) return null;

  const controlDistance = Math.max(
    MINIMUM_CONTROL_DISTANCE,
    (endX - startX) * 0.46,
  );

  return {
    width: containerBounds.width,
    height: containerBounds.height,
    path: `M ${startX} ${startY} C ${startX + controlDistance} ${startY}, ${endX - controlDistance} ${endY}, ${endX} ${endY}`,
    startX,
    startY,
    endX,
    endY,
  };
}

function isSameGeometry(
  current: ElementConnectorGeometry | null,
  next: ElementConnectorGeometry | null,
): boolean {
  if (current === next) return true;
  if (!current || !next) return false;
  return current.path === next.path
    && current.width === next.width
    && current.height === next.height;
}

export function useElementConnector({
  activeIndex,
  containerRef,
  sourceRefs,
  targetRef,
}: UseElementConnectorOptions): ElementConnectorGeometry | null {
  const [geometry, setGeometry] = useState<ElementConnectorGeometry | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const source = sourceRefs.current[activeIndex];
    const target = targetRef.current;
    if (!container || !source || !target) return;

    const desktopQuery = window.matchMedia(DESKTOP_CONNECTOR_QUERY);
    let animationFrame = 0;

    const applyMeasure = () => {
      const nextGeometry = desktopQuery.matches
        ? measureConnector(container, source, target)
        : null;
      setGeometry((current) => (
        isSameGeometry(current, nextGeometry) ? current : nextGeometry
      ));
    };

    // rAF coalesces event bursts, but the first measure must be synchronous:
    // hidden tabs throttle rAF indefinitely, which would leave the connector
    // unmeasured until some later event.
    const measure = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(applyMeasure);
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    resizeObserver.observe(source);
    resizeObserver.observe(target);
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    desktopQuery.addEventListener("change", measure);
    applyMeasure();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      desktopQuery.removeEventListener("change", measure);
    };
  }, [activeIndex, containerRef, sourceRefs, targetRef]);

  return geometry;
}
