import { IMat2d, IPolyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";
import { vecTransformBy } from "../vecFunctions/vecTransformBy";
import { polylineAlloc } from "./polylineAlloc";

const TMP0 = vecAlloc();

/**
 * Transforms a polyline by an affine matrix.
 *
 * Simply transforms each of the polyline's vertices by the given matrix.
 * Affine transformations and their specifics within Vectormath are described in more detail
 * in the {@link vecTransformBy} docs.
 *
 * @param poly polyline to transform
 * @param mat affine transform to apply
 * @param out
 * @see {@link vecTransformBy}
 * @see {@link Imat2d}
 */
export function polylineTransformBy(poly: IPolyline, mat: IMat2d, out = polylineAlloc()) {
  if (out.length !== poly.length) {
    out.length = poly.length;
  }

  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vecReset(poly[i], poly[i + 1], TMP0);
    vecTransformBy(v0, mat, v0);
    out[i] = v0.x;
    out[i + 1] = v0.y;
  }

  return out;
}
