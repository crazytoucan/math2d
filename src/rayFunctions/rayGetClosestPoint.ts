import { _dot } from "../internal/_dot";
import { IRay, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { rayGetPointAt } from "./rayGetPointAt";

export function rayGetClosestPoint(ray: IRay, point: IVec, out = vecAlloc()) {
  const t = Math.max(0, _dot(ray, point));
  return rayGetPointAt(ray, t, out);
}
