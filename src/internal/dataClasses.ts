import { IBox, IIntersection, ILine, IMat2x3, IPolygon, IPolyline, IRay, ISegment, IVec } from "../types";

class Intersection implements IIntersection {
  constructor(public exists = false, public x = NaN, public y = NaN, public t0 = NaN, public t1 = NaN) {}
}

class Vec implements IVec {
  constructor(public x = NaN, public y = NaN) {}
}

export function _intersectionAlloc(): IIntersection {
  return new Intersection();
}

export function _polygonAlloc(): IPolygon {
  return [];
}

export function _vecAlloc(): IVec {
  return new Vec();
}
