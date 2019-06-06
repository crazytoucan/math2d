import { _lerp } from "../internal/_lerp";
import { IPolygon } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Computes a point along the polygon's perimeter, parameterized according to linear interpolation between
 * adjacent vertices, cycling back to the start after its last vertex.
 *
 * A polygon with _N_ sides is parameterized according to _t_, where integer values of _t0_ correspond to the polygon's
 * vertices in order, and smooth values of _t0_ therein interpolate linearly between adjacent vertices, with an
 * additional segment connecting the last vertex to the first.
 *
 * @param poly the polygon to compute a point on
 * @param t the parameter variable at which a point should be calculated
 * @param out
 */
export function polygonGetPerimeterPointAt(poly: IPolygon, t: number, out = vecAlloc()) {
  const len = poly.length / 2;
  if (len === 0) {
    return vecReset(NaN, NaN, out);
  }

  t = ((t % len) + len) % len;
  const p0 = Math.floor(t);
  const p1 = (p0 + 1) % len;
  return vecReset(_lerp(poly[2 * p0], poly[2 * p1], t - p0), _lerp(poly[2 * p0 + 1], poly[2 * p1 + 1], t - p0), out);
}
