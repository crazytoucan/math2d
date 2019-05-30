import { IBox2, IVec2, IMat2x3, IMat2 } from "../types";
import { arrayReset } from "../internal/collectionsUtils";
import {
  polyline2TransformByAff,
  polyline2GetBounds,
  polyline2Alloc,
  polyline2TransformBy,
} from "./polyline2Functions";
import { OUT_MIN_X, OUT_MAX_X, OUT_MIN_Y, OUT_MAX_Y } from "../const";

const TMP_POLYLINE = polyline2Alloc();

class Aabb implements IBox2 {
  constructor(public minX = NaN, public minY = NaN, public maxX = NaN, public maxY = NaN) {}
}

export function box2Alloc(): IBox2 {
  return new Aabb();
}

export function box2Clone(box: IBox2, out = box2Alloc()) {
  return box2Reset(box.minX, box.minY, box.maxX, box.maxY, out);
}

export function box2ComputeOutCode(box: IBox2, point: IVec2) {
  let out = 0;
  if (point.x <= box.minX) {
    out |= OUT_MIN_X;
  } else if (point.x >= box.maxX) {
    out |= OUT_MAX_X;
  }

  if (point.y <= box.minY) {
    out |= OUT_MIN_Y;
  } else if (point.y >= box.maxY) {
    out |= OUT_MAX_Y;
  }

  return out;
}

export function box2ContainsBox(a: IBox2, b: IBox2) {
  return b.minX >= a.minX && b.minY >= a.minY && b.maxX <= a.maxX && b.maxY <= a.maxY;
}

export function box2ContainsPoint(box: IBox2, point: IVec2) {
  return point.x > box.minX && point.y > box.minY && point.x < box.maxX && point.y < box.maxY;
}

export function box2Encapsulate(box: IBox2, point: IVec2, out = box2Alloc()) {
  return box2Reset(
    Math.min(box.minX, point.x),
    Math.min(box.minY, point.y),
    Math.max(box.maxX, point.x),
    Math.max(box.maxY, point.y),
    out,
  );
}

export function box2Intersects(a: IBox2, b: IBox2) {
  return a.minX < b.maxX && a.minY < b.maxY && a.maxX > b.minX && a.maxY > b.minY;
}

export function box2Intersection(a: IBox2, b: IBox2, out = box2Alloc()) {
  return box2Reset(
    Math.max(a.minX, b.minX),
    Math.max(a.minY, b.minY),
    Math.min(a.maxX, b.maxX),
    Math.min(a.maxY, b.maxY),
    out,
  );
}

export function box2IsEmpty(box: IBox2) {
  return box.maxX <= box.minX || box.maxY <= box.minY;
}

export function box2Reset(minX: number, minY: number, maxX: number, maxY: number, out = box2Alloc()) {
  out.minX = minX;
  out.minY = minY;
  out.maxX = maxX;
  out.maxY = maxY;
  return out;
}

export function box2TransformBy(box: IBox2, mat: IMat2, out = box2Alloc()) {
  arrayReset(TMP_POLYLINE, box.minX, box.minY, box.minX, box.maxY, box.maxX, box.maxY, box.maxX, box.minY);
  polyline2TransformBy(TMP_POLYLINE, mat, TMP_POLYLINE);
  return polyline2GetBounds(TMP_POLYLINE, out);
}

export function box2TransformByAff(box: IBox2, mat: IMat2x3, out = box2Alloc()) {
  arrayReset(TMP_POLYLINE, box.minX, box.minY, box.minX, box.maxY, box.maxX, box.maxY, box.maxX, box.minY);
  polyline2TransformByAff(TMP_POLYLINE, mat, TMP_POLYLINE);
  return polyline2GetBounds(TMP_POLYLINE, out);
}

export function box2Union(a: IBox2, b: IBox2, out = box2Alloc()) {
  return box2Reset(
    Math.min(a.minX, b.minX),
    Math.min(a.minY, b.minY),
    Math.max(a.maxX, b.maxX),
    Math.max(a.maxY, b.maxY),
    out,
  );
}
