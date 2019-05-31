import { IIntersection } from "../types";
import { _intersectionAlloc } from "../internal/primitives";

export function intersectionAlloc() {
  return _intersectionAlloc();
}

export function intersectionClone(inter: IIntersection, out = intersectionAlloc()) {
  return intersectionReset(inter.exists, inter.x, inter.y, inter.t0, inter.t1, out);
}

export function intersectionReset(
  exists: boolean,
  x: number,
  y: number,
  t0: number,
  t1: number,
  out = intersectionAlloc(),
) {
  out.exists = exists;
  out.x = x;
  out.y = y;
  out.t0 = t0;
  out.t1 = t1;
  return out;
}
