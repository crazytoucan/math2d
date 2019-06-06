import { _clamp } from "../internal/_clamp";
import { IPolyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { polylineAlloc } from "./polylineAlloc";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetPointAt } from "./polylineGetPointAt";

const TMP0 = vecAlloc();

/**
 * Trims a polyline to a range of its _t_ parameter.
 *
 * This function trims geometry from either or both ends of the polyline, kind of like a "substring"
 * operation. Note that fractional values are allowed on the bounding _t_ parameters, which may slice off
 * only parts of segments to form new vertices.
 *
 * A polyline's parameterization is defined according to _t_, where
 * values of _t_ are between 0 and the polyline's vertex count minus 1, and smooth values of _t_ therein
 * signify linear interpolation between adjacent vertices along the polyline's geometry.
 *
 * Both the `tStart` and `tEnd` parameters will be clamped to their allowed domains [0, _N_-1] for a
 * polyline of _N_ vertices.
 *
 * @param poly the polyline to trim
 * @param tStart minimum _t_ value to include. The resulting polyline will have its first vertex at
 *  the point described by this value on the original polyline. Internally, this value will be clamped
 *  to the allowed domain `[0, poly.length/2 - 1]`.
 * @param tStart minimum _t_ value to include. The resulting polyline will have its last vertex at
 *  the point described by this value on the original polyline. Internally, this value will be clamped
 *  to the allowed domain `[0, poly.length/2 - 1]`.
 * @param out
 */
export function polylineTrim(poly: IPolyline, tStart: number, tEnd: number, out = polylineAlloc()) {
  if (poly.length === 0) {
    out.length = 0;
    return;
  }

  const maxAllowedT = polylineGetNumSegments(poly);
  tStart = _clamp(tStart, 0, maxAllowedT);
  tEnd = _clamp(tEnd, tStart, maxAllowedT);

  const startFloor = Math.floor(tStart);
  const endCeil = Math.ceil(tEnd);

  out.length = 2 * (endCeil - startFloor + 1);
  let cursor = 0;
  const beginPoint = polylineGetPointAt(poly, tStart, TMP0);
  out[cursor++] = beginPoint.x;
  out[cursor++] = beginPoint.y;

  for (let i = startFloor + 1; i < tEnd; i++) {
    out[cursor++] = poly[2 * i];
    out[cursor++] = poly[2 * i + 1];
  }

  const endPoint = polylineGetPointAt(poly, tEnd, TMP0);
  out[cursor++] = endPoint.x;
  out[cursor++] = endPoint.y;
  return out;
}
