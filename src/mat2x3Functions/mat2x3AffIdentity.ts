import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

export function mat2x3AffIdentity(out = mat2x3Alloc()) {
  return mat2x3Reset(1, 0, 0, 1, 0, 0, out);
}
