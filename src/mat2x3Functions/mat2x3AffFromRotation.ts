import { mat2x3Alloc } from "./mat2x3Alloc";
import { mat2x3Reset } from "./mat2x3Reset";

export function mat2x3AffFromRotation(theta: number, out = mat2x3Alloc()) {
  const sin = Math.sin(theta);
  const cos = Math.cos(theta);
  return mat2x3Reset(cos, -sin, sin, cos, 0, 0, out);
}
