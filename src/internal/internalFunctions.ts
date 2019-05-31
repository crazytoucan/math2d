import { IRay, IMat2x3 } from "../types";
import { vecAlloc, vecReset, vecNormalize, vecTransformByAff } from "../functions/vecFunctions";
import { rayReset } from "../functions/rayFunctions";

export function _clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

const TMP_rayLookAt_0 = vecAlloc();
export function _rayLookAt(x0: number, y0: number, x1: number, y1: number, out: IRay) {
  const dir = vecReset(x1 - x0, y1 - y0, TMP_rayLookAt_0);
  vecNormalize(dir, dir);
  return rayReset(x0, y0, dir.x, dir.y, out);
}

const TMP_rayTransformByScalePreservingAff_0 = vecAlloc();
export function _rayTransformByOrtho(ray: IRay, mat: IMat2x3, out: IRay) {
  const initial = vecReset(ray.x0, ray.y0, TMP_rayTransformByScalePreservingAff_0);
  vecTransformByAff(initial, mat, initial);
  return rayReset(initial.x, initial.y, mat.a * ray.dirX + mat.c * ray.dirY, mat.b * ray.dirX + mat.d * ray.dirY, out);
}
