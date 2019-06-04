import { lineReset } from "../lineFunctions/lineReset";
import { ILine, IMat2x3, IRay } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";
import { vecTransformByAff } from "../vecFunctions/vecTransformByAff";

const TMP0 = vecAlloc();
export function _lineTransformByOrtho(ray: IRay, mat: IMat2x3, out: ILine) {
  const initial = vecReset(ray.x0, ray.y0, TMP0);
  vecTransformByAff(initial, mat, initial);
  return lineReset(initial.x, initial.y, mat.a * ray.dirX + mat.c * ray.dirY, mat.b * ray.dirX + mat.d * ray.dirY, out);
}
