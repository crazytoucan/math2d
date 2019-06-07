import { IPolyline, IVec } from "../types";
import { polylineNearestDistanceSq } from "./polylineNearestDistanceSq";

/**
 * Computes the closest distance that a polyline comes to a given reference point.
 *
 *  If you care about the actual closest point or its parameterization, prefer
 * {@link polylineNearestPoint} or {@link polylineNearestT}.
 *
 * @param segment segment to inspect
 * @param point point to measure distance to
 * @param out
 * @see {@link IPolyline}
 * @see {@link polylineNearestDistanceSq}
 */
export function polylineNearestDistance(poly: IPolyline, point: IVec) {
  return Math.sqrt(polylineNearestDistanceSq(poly, point));
}
