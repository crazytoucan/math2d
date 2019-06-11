import { nearestPointResultAlloc } from "../nearestPointResultFunctions/nearestPointResultAlloc";
import { ILine, IVec } from "../types";
import { lineNearestSignedDistanceToPoint } from "./lineNearestSignedDistanceToPoint";

/**
 * Determines the closest the line comes to a given point
 *
 * This measures the perpendicular distance of the point to the line's
 * direction vector. If the point lies on the line, this function returns 0.
 *
 * To get the signed distance of the point to the line, which additionally
 * encodes which half-plane the point lies within, see
 * {@link lineNearestSignedDistanceToPoint}.
 *
 * @param line the line to inspect
 * @param point the reference point to check for closest distance
 * @see INearestPointResult
 */
export function lineNearestDistanceToPoint(line: ILine, point: IVec, out = nearestPointResultAlloc()) {
  lineNearestSignedDistanceToPoint(line, point, out);
  out.distanceValue = Math.abs(out.distanceValue);
  return out;
}
