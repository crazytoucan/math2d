import { rayAlloc } from "../rayFunctions/rayAlloc";
import { rayReset } from "../rayFunctions/rayReset";
import { IMat2d, IRay } from "../types";
import { vecReset } from "../vecFunctions/vecReset";
import { vecTransformBy } from "../vecFunctions/vecTransformBy";

export function _rayTransformByOrtho(ray: IRay, mat: IMat2d, out: IRay = rayAlloc()) {
  const initial = vecReset(ray.x0, ray.y0);
  vecTransformBy(initial, mat, initial);
  return rayReset(initial.x, initial.y, mat.a * ray.dirX + mat.c * ray.dirY, mat.b * ray.dirX + mat.d * ray.dirY, out);
}
