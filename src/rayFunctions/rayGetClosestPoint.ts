import { _dot } from "../internal/internalFunctions";
import { IRay, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { rayPointAt } from "./rayPointAt";

export function rayGetClosestPoint(ray: IRay, point: IVec, out = vecAlloc()) {
  const t = Math.max(0, _dot(ray, point));
  return rayPointAt(ray, t, out);
}
