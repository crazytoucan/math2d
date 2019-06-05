import { _lerp } from "../internal/_lerp";
import { IPolygon } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

export function polygonGetPointAt(poly: IPolygon, t: number, out = vecAlloc()) {
  const len = poly.length / 2;
  if (len === 0) {
    return vecReset(NaN, NaN, out);
  }

  t = ((t % len) + len) % len;
  const p0 = Math.floor(t);
  const p1 = (p0 + 1) % len;
  return vecReset(_lerp(poly[2 * p0], poly[2 * p1], t - p0), _lerp(poly[2 * p0 + 1], poly[2 * p1 + 1], t - p0), out);
}
