import { IMat2x3, IPolyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";
import { vecTransformByAff } from "../vecFunctions/vecTransformByAff";
import { polylineAlloc } from "./polylineAlloc";

const TMP0 = vecAlloc();

/**
 * Transforms a polyline by an affine matrix.
 *
 * Simply transforms each of the polyline's vertices by the given matrix.
 * Affine transformations and their specifics within Vectormath are described in more detail
 * in the {@link vecTransformByAff} docs.
 *
 * @param poly polyline to transform
 * @param mat affine transform to apply
 * @param out
 * @see {@link vecTransformByAff}
 * @see {@link IMat2x3}
 */
export function polylineTransformByAff(poly: IPolyline, mat: IMat2x3, out = polylineAlloc()) {
  if (out.length !== poly.length) {
    out.length = poly.length;
  }

  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], TMP0);
    vecTransformByAff(v0, mat, v0);
    out[i] = v0.x;
    out[i + 1] = v0.y;
  }

  return out;
}
