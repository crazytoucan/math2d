import { _asPolyline } from "../internal/_asPolyline";
import { nearestPointResultAlloc } from "../nearestPointResultFunctions/nearestPointResultAlloc";
import { polylineNearestDistanceSqToPoint } from "../polylineFunctions/polylineNearestDistanceSqToPoint";
import { IPolygon, IVec } from "../types";

/**
 * Computes the closest the polygon's perimeter comes to a given reference point.
 *
 * The returned value _t_ is defined according to the {@link IPolygon} parameterization:
 * integer values of _t_ correspond to the polygon's
 * vertices in order, and smooth values of _t_ therein interpolate linearly between adjacent vertices, with an
 * additional segment connecting the last vertex to the first.
 *
 * This function returns the squared euclidean distance in the `distanceValue` field of the result.
 *
 * @param poly the polygon to inspect
 * @param point the point to measure distance to
 * @param out
 * @see {@link IPolygon}
 */
export function polygonNearestDistanceSqToPoint(poly: IPolygon, point: IVec, out = nearestPointResultAlloc()) {
  return polylineNearestDistanceSqToPoint(_asPolyline(poly), point, out);
}
