import { Polyline, Vec } from "../types";

/**
 * Determines whether the point is inside the given polygon, using the even-odd fill rule.
 *
 * @param poly the polygon to inspect
 * @param point the point to check for containment
 */
export function polylineContainsPointInside(poly: Polyline, point: Vec) {
  const x = point.x;
  const y = point.y;

  let inside = false;
  for (let i = 0; i < poly.length; i += 2) {
    const x0 = poly[i];
    const y0 = poly[i + 1];
    const x1 = i !== poly.length - 2 ? poly[i + 2] : poly[0];
    const y1 = i !== poly.length - 2 ? poly[i + 3] : poly[1];
    const intersects = y0 > y !== y1 > y && x - x0 < ((x1 - x0) * (y - y0)) / (y1 - y0);

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}
