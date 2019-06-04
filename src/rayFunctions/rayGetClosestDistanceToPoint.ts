import { _vecAlloc } from "../internal/dataClasses";
import { _dot } from "../internal/internalFunctions";
import { EPSILON } from "../internal/parameters";
import { lineClosestDistanceToPoint } from "../lineFunctions/lineClosestDistanceToPoint";
import { IRay, IVec } from "../types";
import { vecDistance } from "../vecFunctions/vecDistance";
import { vecReset } from "../vecFunctions/vecReset";

const TMP_rayGetClosestDistance_0 = _vecAlloc();
export function rayGetClosestDistanceToPoint(ray: IRay, point: IVec) {
  const t = _dot(ray, point);
  if (t <= -EPSILON) {
    const initial = vecReset(ray.x0, ray.y0, TMP_rayGetClosestDistance_0);
    return vecDistance(initial, point);
  } else {
    return lineClosestDistanceToPoint(ray, point);
  }
}
