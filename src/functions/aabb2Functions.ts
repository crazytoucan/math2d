import { IAabb2, IVec2, IMat2x3, IMat2 } from "../types";
import { arrayReset } from "../internal/collectionsUtils";
import {
  polyline2TransformByAff,
  polyline2GetBounds,
  polyline2Alloc,
  polyline2TransformBy,
} from "./polyline2Functions";

const TMP_POLYLINE = polyline2Alloc();

class Aabb implements IAabb2 {
  constructor(public minX = NaN, public maxX = NaN, public minY = NaN, public maxY = NaN) {}
}

export function aabb2Alloc(): IAabb2 {
  return new Aabb();
}

export function aabb2Clone(box: IAabb2, out = aabb2Alloc()) {
  return aabb2Reset(box.minX, box.maxX, box.minY, box.maxY, out);
}

export function aabb2ContainsPoint(box: IAabb2, vec: IVec2) {
  return vec.x > box.minX && vec.x < box.maxX && vec.y > box.minY && vec.y < box.maxY;
}

export function aabb2IncludePoint(box: IAabb2, vec: IVec2, out = aabb2Alloc()) {
  return aabb2Reset(
    Math.min(box.minX, vec.x),
    Math.max(box.maxX, vec.x),
    Math.min(box.minY, vec.y),
    Math.max(box.maxY, vec.y),
    out,
  );
}

export function aabb2IntersectsAabb2(a: IAabb2, b: IAabb2) {
  return a.minX < b.maxX && a.maxX > b.minX && a.minY < b.maxY && a.maxY > b.minY;
}

export function aabb2Intersection(a: IAabb2, b: IAabb2, out = aabb2Alloc()) {
  return aabb2Reset(
    Math.max(a.minX, b.minX),
    Math.min(a.maxX, b.maxX),
    Math.max(a.minY, b.minY),
    Math.min(a.maxY, b.maxY),
    out,
  );
}

export function aabb2IsEmpty(box: IAabb2) {
  return box.maxX <= box.minX || box.maxY <= box.minY;
}

export function aabb2Reset(minX: number, maxX: number, minY: number, maxY: number, out = aabb2Alloc()) {
  out.minX = minX;
  out.maxX = maxX;
  out.minY = minY;
  out.maxY = maxY;
  return out;
}

export function aabb2TransformBy(box: IAabb2, mat: IMat2, out = aabb2Alloc()) {
  arrayReset(TMP_POLYLINE, box.minX, box.minY, box.minX, box.maxY, box.maxX, box.maxY, box.maxX, box.minY);
  polyline2TransformBy(TMP_POLYLINE, mat, TMP_POLYLINE);
  return polyline2GetBounds(TMP_POLYLINE, out);
}

export function aabb2TransformByAff(box: IAabb2, mat: IMat2x3, out = aabb2Alloc()) {
  arrayReset(TMP_POLYLINE, box.minX, box.minY, box.minX, box.maxY, box.maxX, box.maxY, box.maxX, box.minY);
  polyline2TransformByAff(TMP_POLYLINE, mat, TMP_POLYLINE);
  return polyline2GetBounds(TMP_POLYLINE, out);
}

export function aabb2Union(a: IAabb2, b: IAabb2, out = aabb2Alloc()) {
  return aabb2Reset(
    Math.min(a.minX, b.minX),
    Math.max(a.maxX, b.maxX),
    Math.min(a.minY, b.minY),
    Math.max(a.maxY, b.maxY),
    out,
  );
}
