import { mat2dAlloc } from "./mat2dAlloc";
import { mat2dReset } from "./mat2dReset";

/**
 * Returns the identity affine matrix, `[1 0 0 1 0 0]`
 *
 * @param out
 */
export function mat2dIdentity(out = mat2dAlloc()) {
  return mat2dReset(1, 0, 0, 1, 0, 0, out);
}
