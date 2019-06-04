import { IPolyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

export function polylineGetVertex(poly: IPolyline, index: number, out = vecAlloc()) {
  const l = 2 * index;
  return l >= 0 && l < poly.length ? vecReset(poly[l], poly[l + 1], out) : vecReset(NaN, NaN, out);
}
