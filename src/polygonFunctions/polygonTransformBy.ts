import { polylineTransformBy } from "../polylineFunctions/polylineTransformBy";
import { IMat2d, IPolygon } from "../types";
import { polygonAlloc } from "./polygonAlloc";

/**
 * Transforms a polygon by an affine matrix.
 *
 * Simply transforms each of the polygon's vertices by the given matrix.
 * Affine transformations and their specifics within Math2d are described in more detail
 * in the {@link vecTransformBy} docs.
 *
 * @param poly polygon to transform
 * @param mat affine transform to apply
 * @param out
 * @see {@link vecTransformBy}
 * @see {@link Imat2d}
 */
export function polygonTransformBy(poly: IPolygon, mat: IMat2d, out = polygonAlloc()) {
  return polylineTransformBy(poly, mat, out);
}
