import { boxAlloc } from "../boxFunctions/boxAlloc";
import { boxEncapsulate } from "../boxFunctions/boxEncapsulate";
import { boxReset } from "../boxFunctions/boxReset";
import { IPolyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Computes bounding box of polyline's geometry
 *
 * @param poly
 * @param out
 */
export function polylineGetBounds(poly: IPolyline, out = boxAlloc()) {
  const tmp0 = vecAlloc();
  boxReset(Infinity, Infinity, -Infinity, -Infinity, out);
  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], tmp0);
    boxEncapsulate(out, v0, out);
  }

  return out;
}
