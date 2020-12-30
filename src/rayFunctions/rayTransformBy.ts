import { _lookAt } from "../internal/_lookAt";
import { Mat2d, Ray } from "../types";
import { vecReset } from "../vecFunctions/vecReset";
import { vecTransformBy } from "../vecFunctions/vecTransformBy";
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
 */
export function rayTransformBy(ray: Ray, mat: Mat2d, out = rayAlloc()) {
  const p0 = vecReset(ray.x0, ray.y0);
  vecTransformBy(p0, mat, p0);
  const p1 = vecReset(ray.x0 + ray.dirX, ray.y0 + ray.dirY);
  vecTransformBy(p1, mat, p1);
  return _lookAt(p0.x, p0.y, p1.x, p1.y, out);
}
