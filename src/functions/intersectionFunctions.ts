import { IIntersection } from "../types";

class Intersection implements IIntersection {
  constructor(public exists = false, public x = NaN, public y = NaN, public t0 = NaN, public t1 = NaN) {}
}

export function intersectionAlloc(): IIntersection {
  return new Intersection();
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
