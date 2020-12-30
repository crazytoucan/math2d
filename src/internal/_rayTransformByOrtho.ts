import { rayAlloc } from "../rayFunctions/rayAlloc";
import { rayReset } from "../rayFunctions/rayReset";
import { Mat2d, Ray } from "../types";
import { vecReset } from "../vecFunctions/vecReset";
import { vecTransformBy } from "../vecFunctions/vecTransformBy";

export function _rayTransformByOrtho(ray: Ray, mat: Mat2d, out: Ray = rayAlloc()) {
  const initial = vecReset(ray.x0, ray.y0);
  vecTransformBy(initial, mat, initial);
  return rayReset(initial.x, initial.y, mat.a * ray.dirX + mat.c * ray.dirY, mat.b * ray.dirX + mat.d * ray.dirY, out);
}
