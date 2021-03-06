import { Mat2d, Polyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";
import { vecTransformBy } from "../vecFunctions/vecTransformBy";
import { polylineAlloc } from "./polylineAlloc";


/**
 * Transforms a polyline by an affine matrix.
 *
 * Simply transforms each of the polyline's vertices by the given matrix.
 * Affine transformations and their specifics within Math2d are described in more detail
 * in the {@link vecTransformBy} docs.
 *
 * @param poly polyline to transform
 * @param mat affine transform to apply
 * @param out
 */
export function polylineTransformBy(poly: Polyline, mat: Mat2d, out = polylineAlloc()) {
  const tmp0 = vecAlloc();
  if (out.length !== poly.length) {
    out.length = poly.length;
  }

  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], tmp0);
    vecTransformBy(v0, mat, v0);
    out[i] = v0.x;
    out[i + 1] = v0.y;
  }

  return out;
}
