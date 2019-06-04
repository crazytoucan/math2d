import { lineTransformByAff } from "../lineFunctions/lineTransformByAff";
import { IMat2x3, IRay } from "../types";
import { rayAlloc } from "./rayAlloc";

export function rayTransformByAff(ray: IRay, mat: IMat2x3, out = rayAlloc()) {
  return lineTransformByAff(ray, mat, out);
}
