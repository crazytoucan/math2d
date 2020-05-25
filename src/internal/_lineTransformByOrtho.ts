import { lineAlloc } from "../lineFunctions/lineAlloc";
import { lineReset } from "../lineFunctions/lineReset";
import { ILine, IMat2d, IRay } from "../types";
import { vecReset } from "../vecFunctions/vecReset";
import { vecTransformBy } from "../vecFunctions/vecTransformBy";

export function _lineTransformByOrtho(ray: IRay, mat: IMat2d, out: ILine = lineAlloc()) {
  const initial = vecReset(ray.x0, ray.y0);
  vecTransformBy(initial, mat, initial);
  return lineReset(initial.x, initial.y, mat.a * ray.dirX + mat.c * ray.dirY, mat.b * ray.dirX + mat.d * ray.dirY, out);
}
