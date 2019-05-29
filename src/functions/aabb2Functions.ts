import { IAabb2, IVec2 } from "../types";

class Aabb2 implements IAabb2 {
  constructor(
    public minX = NaN,
    public maxX = NaN,
    public minY = NaN,
    public maxY = NaN
  ) {}
}

export function aabb2Alloc(): IAabb2 {
  return new Aabb2();
}

export function aabb2Clone(box: IAabb2, out = aabb2Alloc()) {
  out.minX = box.minX;
  out.maxX = box.maxX;
  out.minY = box.minY;
  out.maxY = box.maxY;
}

export function aabb2IncludePoint(box: IAabb2, vec: IVec2, out = aabb2Alloc()) {
  out.minX = Math.min(box.minX, vec.x);
  out.maxX = Math.max(box.maxX, vec.x);
  out.minY = Math.min(box.minY, vec.y);
  out.maxY = Math.max(box.maxY, vec.y);
}

export function aabb2Intersection(a: IAabb2, b: IAabb2, out = aabb2Alloc()) {
  out.minX = Math.max(a.minX, b.minX);
  out.maxX = Math.min(a.maxX, b.maxX);
  out.minY = Math.max(a.minY, b.minY);
  out.maxY = Math.min(a.maxY, b.maxY);
  return out;
}

export function aabb2IsEmpty(box: IAabb2) {
  return box.maxX <= box.minX || box.maxY <= box.minY;
}

export function aabb2Reset(
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  out = aabb2Alloc()
) {
  out.minX = minX;
  out.maxX = maxX;
  out.minY = minY;
  out.maxY = maxY;
  return out;
}

export function aabb2Union(a: IAabb2, b: IAabb2, out = aabb2Alloc()) {
  out.minX = Math.min(a.minX, b.minX);
  out.maxX = Math.max(a.maxX, b.maxX);
  out.minY = Math.min(a.minY, b.minY);
  out.maxY = Math.max(a.maxY, b.maxY);
  return out;
}
