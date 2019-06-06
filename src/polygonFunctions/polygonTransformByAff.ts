import { polylineTransformByAff } from "../polylineFunctions/polylineTransformByAff";
import { IMat2x3, IPolygon } from "../types";
import { polygonAlloc } from "./polygonAlloc";

/**
 * Transforms a polygon by an affine matrix.
 *
 * Simply transforms each of the polygon's vertices by the given matrix.
 * Affine transformations and their specifics within Vectormath are described in more detail
 * in the {@link vecTransformByAff} docs.
 *
 * @param poly polygon to transform
 * @param mat affine transform to apply
 * @param out
 * @see {@link vecTransformByAff}
 * @see {@link IMat2x3}
 */
export function polygonTransformByAff(poly: IPolygon, mat: IMat2x3, out = polygonAlloc()) {
  return polylineTransformByAff(poly, mat, out);
}
