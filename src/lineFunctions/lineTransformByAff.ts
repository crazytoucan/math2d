import { _lookAt } from "../internal/_lookAt";
import { ILine, IMat2x3 } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";
import { vecTransformByAff } from "../vecFunctions/vecTransformByAff";
import { lineAlloc } from "./lineAlloc";

const TMP0 = vecAlloc();
const TMP1 = vecAlloc();

/**
 * Transforms a line by an affine matrix.
 *
 * This function computes the result of applying a transform to the line's geometry.
 * The resulting initial point will be the result of applying the given transform to the original
 * initial point, and its direction will be the result of applying any rotations or shears from
 * the matrix. The resulting direction vector will be correctly normalized when applicable.
 *
 * Affine transformations and their specifics within Vectormath are described in more detail
 * in the {@link vecTransformByAff} docs.
 *
 * Synonymous to {@link rayTransformByAff}.
 *
 * @param line the line to transform
 * @param mat the affine transform to apply
 * @param out
 * @see {@link vecTransformByAff}
 * @see {@link IMat2x3}
 */
export function lineTransformByAff(line: ILine, mat: IMat2x3, out = lineAlloc()) {
  const p0 = vecReset(line.x0, line.y0, TMP0);
  vecTransformByAff(p0, mat, p0);
  const p1 = vecReset(line.x0 + line.dirX, line.y0 + line.dirY, TMP1);
  vecTransformByAff(p1, mat, p1);
  return _lookAt(p0.x, p0.y, p1.x, p1.y, out);
}
