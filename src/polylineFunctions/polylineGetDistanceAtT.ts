import { Polyline } from "../types";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetSegmentLength } from "./polylineGetSegmentLength";

/**
 * Computes the Euclidean distance traveled along the polyline's geometry to get to
 * the parametric point at _t_.
 *
 * Values of _t_ are interpreted according to the {@link IPolyline} parameterization:
 * _t_ should be between 0 and the polyline's vertex count minus 1, and smooth values of _t_ therein
 * signify linear interpolation between adjacent vertices of the polyline's geometry.
 *
 * This function is the inverse of {@link polylineGetTAtDistance}.
 *
 * @param poly the polyline to inspect
 * @param t the parametric value along the polyline's geometry to measure distance to
 * __see {@link IPolyline}
 * __see {@link polylineGetTAtDistance}
 */
export function polylineGetDistanceAtT(polyline: Polyline, t: number) {
  const numSegments = polylineGetNumSegments(polyline);
  let traveled = 0;
  for (let i = 0; i < numSegments; i++) {
    const segmentLength = polylineGetSegmentLength(polyline, i);
    if (t <= 1) {
      return traveled + t * segmentLength;
    } else {
      traveled += segmentLength;
      t -= 1;
    }
  }

  return traveled;
}
