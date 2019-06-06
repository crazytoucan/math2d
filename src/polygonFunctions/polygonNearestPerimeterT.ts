import { _asPolyline } from "../internal/_asPolyline";
import { polylineNearestT } from "../polylineFunctions/polylineNearestT";
import { IPolygon, IVec } from "../types";

/**
 * Computes the closest location that the polygon's perimeter comes to a given reference point.
 *
 * The returned value _t_ is defined according to the {@link IPolygon} parameterization:
 * integer values of _t_ correspond to the polygon's
 * vertices in order, and smooth values of _t_ therein interpolate linearly between adjacent vertices, with an
 * additional segment connecting the last vertex to the first.
 *
 * If you only care about the actual closest _point_ and not its parameterization, prefer
 * {@link polygonNearestPerimeterPoint}.
 *
 * @param poly the polygon to inspect
 * @param point the point to measure distance to
 * @param out
 * @see {@link IPolygon}
 * @see {@link polygonNearestPoint}
 * @see {@link segmentNearestT}
 */
export function polygonNearestPerimeterT(poly: IPolygon, point: IVec) {
  return polylineNearestT(_asPolyline(poly), point);
}
