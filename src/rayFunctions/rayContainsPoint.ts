import { _dot } from "../internal/_dot";
import { _dotPerp } from "../internal/_dotPerp";
import { EPSILON } from "../internal/const";
import { IRay, IVec } from "../types";

export function rayContainsPoint(ray: IRay, point: IVec) {
  const t = _dot(ray, point);
  if (t < -EPSILON) {
    return false;
  }

  return Math.abs(_dotPerp(ray, point)) < EPSILON;
}
