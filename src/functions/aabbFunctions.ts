import { IAabb, IVec, IAffineMatrix } from "../types";
import { arrayReset } from "../internal/collectionsUtils";
import { polylineTransformBy, polylineGetBounds } from "./polylineFunctions";

class Aabb implements IAabb {
  constructor(public minX = NaN, public maxX = NaN, public minY = NaN, public maxY = NaN) {}
}

const TMP_ARR8: number[] = [];

export function aabbAlloc(): IAabb {
  return new Aabb();
}

export function aabbClone(box: IAabb, out = aabbAlloc()) {
  out.minX = box.minX;
  out.maxX = box.maxX;
  out.minY = box.minY;
  out.maxY = box.maxY;
}

export function aabbContainsPoint(box: IAabb, vec: IVec) {
  return vec.x > box.minX && vec.x < box.maxX && vec.y > box.minY && vec.y < box.maxY;
}

export function aabbIncludePoint(box: IAabb, vec: IVec, out = aabbAlloc()) {
  out.minX = Math.min(box.minX, vec.x);
  out.maxX = Math.max(box.maxX, vec.x);
  out.minY = Math.min(box.minY, vec.y);
  out.maxY = Math.max(box.maxY, vec.y);
}

export function aabbIntersectsAabb2(box0: IAabb, box1: IAabb) {
  return box0.minX < box1.maxX && box0.maxX > box1.minX && box0.minY < box1.maxY && box0.maxY > box1.minY;
}

export function aabbIntersection(a: IAabb, b: IAabb, out = aabbAlloc()) {
  out.minX = Math.max(a.minX, b.minX);
  out.maxX = Math.min(a.maxX, b.maxX);
  out.minY = Math.max(a.minY, b.minY);
  out.maxY = Math.min(a.maxY, b.maxY);
  return out;
}

export function aabbIsEmpty(box: IAabb) {
  return box.maxX <= box.minX || box.maxY <= box.minY;
}

export function aabbReset(minX: number, maxX: number, minY: number, maxY: number, out = aabbAlloc()) {
  out.minX = minX;
  out.maxX = maxX;
  out.minY = minY;
  out.maxY = maxY;
  return out;
}

export function aabbTransformBy(box: IAabb, mat: IAffineMatrix, out = aabbAlloc()) {
  arrayReset(TMP_ARR8, box.minX, box.minY, box.minX, box.maxY, box.maxX, box.maxY, box.maxX, box.minY);
  polylineTransformBy(TMP_ARR8, mat, TMP_ARR8);
  return polylineGetBounds(TMP_ARR8, out);
}

export function aabbUnion(a: IAabb, b: IAabb, out = aabbAlloc()) {
  out.minX = Math.min(a.minX, b.minX);
  out.maxX = Math.max(a.maxX, b.maxX);
  out.minY = Math.min(a.minY, b.minY);
  out.maxY = Math.max(a.maxY, b.maxY);
  return out;
}
