import { _dot } from "../internal/_dot";
import { EPSILON } from "../internal/const";
import { lineClosestDistanceToPoint } from "../lineFunctions/lineClosestDistanceToPoint";
import { IRay, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecDistance } from "../vecFunctions/vecDistance";
import { vecReset } from "../vecFunctions/vecReset";

const TMP0 = vecAlloc();

export function rayGetClosestDistanceToPoint(ray: IRay, point: IVec) {
  const t = _dot(ray, point);
  if (t <= -EPSILON) {
    const initial = vecReset(ray.x0, ray.y0, TMP0);
    return vecDistance(initial, point);
  } else {
    return lineClosestDistanceToPoint(ray, point);
  }
}
