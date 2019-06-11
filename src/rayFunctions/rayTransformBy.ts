import { lineTransformBy } from "../lineFunctions/lineTransformBy";
import { IMat2d, IRay } from "../types";
import { rayAlloc } from "./rayAlloc";

/**
 * Transforms a ray by an affine matrix.
 *
 * This function computes the result of applying a transform to the ray's geometry.
 * The resulting initial point will be the result of applying the given transform to the original
 * initial point, and its direction will be the result of applying any rotations or shears from
 * the matrix. The resulting direction vector will be correctly normalized when applicable.
 *
 * Affine transformations and their specifics within Math2d are described in more detail
 * in the {@link vecTransformBy} docs.
 *
 * Synonymous to {@link lineTransformBy}.
 *
 * @param ray the ray to transform
 * @param mat the affine transform to apply
 * @param out
 * @see {@link vecTransformBy}
 * @see {@link Imat2d}
 */
export function rayTransformBy(ray: IRay, mat: IMat2d, out = rayAlloc()) {
  return lineTransformBy(ray, mat, out);
}
