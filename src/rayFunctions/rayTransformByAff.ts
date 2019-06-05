import { lineTransformByAff } from "../lineFunctions/lineTransformByAff";
import { IMat2x3, IRay } from "../types";
import { rayAlloc } from "./rayAlloc";

/**
 * Transforms a ray by an affine matrix.
 *
 * This function computes the result of applying a transform to the ray's geometry.
 * The resulting initial point will be the result of applying the given transform to the original
 * initial point, and its direction will be the result of applying any rotations or shears from
 * the matrix. The resulting direction vector will be correctly normalized when applicable.
 *
 * Affine transformations and their specifics within Vectormath are described in more detail
 * in the {@link vecTransformByAff} docs.
 *
 * Synonymous to {@link lineTransformByAff}.
 *
 * @param ray ray to transform
 * @param mat affine transform to apply
 * @param out
 * @see {@link vecTransformByAff}
 * @see {@link IMat2x3}
 */
export function rayTransformByAff(ray: IRay, mat: IMat2x3, out = rayAlloc()) {
  return lineTransformByAff(ray, mat, out);
}
