import { rayReset, rayAlloc } from "../functions/rayFunctions";
import { vecAlloc, vecNormalize, vecReset, vecTransformByAff } from "../functions/vecFunctions";
import { IIntersection, ILine, IRay, IVec, IMat2x3 } from "../types";

export function _clamp(value: number, min: number, max: number) {
  return value < min ? min : value > max ? max : value;
}

export function _dot(line: ILine, point: IVec) {
  return line.dirX * (point.x - line.x0) + line.dirY * (point.y - line.y0);
}

export function _intersectionDNE(out: IIntersection) {
  out.exists = false;
  out.x = out.y = out.t0 = out.t1 = NaN;
  return out;
}

export function _intersectionExists(x: number, y: number, t0: number, t1: number, out: IIntersection) {
  out.exists = true;
  out.x = x;
  out.y = y;
  out.t0 = t0;
  out.t1 = t1;
  return out;
}

export function _intersectionSwap(out: IIntersection) {
  const tmp = out.t0;
  out.t0 = out.t1;
  out.t1 = tmp;
}

const TMP_rayLookAt_0 = vecAlloc();
export function _rayLookAt(x0: number, y0: number, x1: number, y1: number, out: IRay) {
  const dir = vecReset(x1 - x0, y1 - y0, TMP_rayLookAt_0);
  vecNormalize(dir, dir);
  return rayReset(x0, y0, dir.x, dir.y, out);
}

const TMP_rayTransformByOrtho_0 = vecAlloc();
export function _rayTransformByOrtho(ray: IRay, mat: IMat2x3, out = rayAlloc()) {
  const initial = vecReset(ray.x0, ray.y0, TMP_rayTransformByOrtho_0);
  vecTransformByAff(initial, mat, initial);
  return rayReset(initial.x, initial.y, mat.a * ray.dirX + mat.c * ray.dirY, mat.b * ray.dirX + mat.d * ray.dirY, out);
}
