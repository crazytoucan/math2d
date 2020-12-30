import { _lerp } from "../internal/_lerp";
import { IPolyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";
import { polylineGetNumSegments } from "./polylineGetNumSegments";

/**
 * Computes a point along the polyline, parameterized according to linear interpolation between
 * adjacent vertices.
 *
 * @param poly the polyline to compute a point on
 * @param t the parameter variable at which a point should be calculated
 * @param out
 * @see {@link IPolyline}
 */
export function polylineGetPointAtT(poly: IPolyline, t: number, out = vecAlloc()) {
  const maxT = polylineGetNumSegments(poly);
  if (t < 0 || t > maxT) {
    return vecReset(NaN, NaN, out);
  }

  if (t === maxT) {
    return vecReset(poly[poly.length - 2], poly[poly.length - 1], out);
  }

  const floorT = Math.floor(t);
  return vecReset(
    _lerp(poly[2 * floorT], poly[2 * floorT + 2], t - floorT),
    _lerp(poly[2 * floorT + 1], poly[2 * floorT + 3], t - floorT),
    out,
  );
}
