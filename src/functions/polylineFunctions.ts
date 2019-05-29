import { IMat2x3, IPolyline } from "../types";
import { aabb2Alloc, aabb2IncludePoint, aabb2Reset } from "./aabb2Functions";
import { vec2Alloc, vec2Distance, vec2Reset, vec2TransformBy } from "./vec2Functions";

const TMP_VEC0 = vec2Alloc();
const TMP_VEC1 = vec2Alloc();

export function polylineAlloc(): IPolyline {
  return [];
}

export function polylineClose(poly: IPolyline, out = polylineAlloc()) {
  const len = poly.length;
  if (len === 0) {
    out.length = 0;
    return out;
  }

  if (out.length !== len + 2) {
    out.length = len + 2;
  }

  for (let i = 0; i < len; i++) {
    out[i] = poly[i];
  }

  out[len] = poly[0];
  out[len + 1] = poly[1];
  return length;
}

export function polylineGetBounds(poly: IPolyline, out = aabb2Alloc()) {
  aabb2Reset(Infinity, -Infinity, Infinity, -Infinity, out);
  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vec2Reset(poly[i], poly[i + 1], TMP_VEC0);
    aabb2IncludePoint(out, v0, out);
  }

  return out;
}

export function polylineGetLength(poly: IPolyline) {
  let length = 0;
  for (let i = 0; i < poly.length - 2; i += 2) {
    const v0 = vec2Reset(poly[i], poly[i + 1], TMP_VEC0);
    const v1 = vec2Reset(poly[i + 2], poly[i + 3], TMP_VEC1);
    length += vec2Distance(v0, v1);
  }

  return length;
}

export function polylineGetNumSegments(poly: IPolyline) {
  return poly.length / 2 - 1;
}

export function polylineGetSegmentIndexAtDistance(poly: IPolyline, distance: number) {
  if (distance < 0) {
    return -1;
  }

  const len = poly.length / 2 - 1;
  let traversed = 0;
  let idx = 0;
  while (idx < len && traversed < distance) {
    traversed += polylineGetSegmentLength(poly, idx);
    ++idx;
  }

  return idx;
}

export function polylineGetSegmentLength(poly: IPolyline, idx: number) {
  const l = 2 * idx;
  const v0 = vec2Reset(poly[l], poly[l + 1], TMP_VEC0);
  const v1 = vec2Reset(poly[l + 2], poly[l + 3], TMP_VEC1);
  return vec2Distance(v0, v1);
}

export function polylineTransformBy(poly: IPolyline, mat: IMat2x3, out = polylineAlloc()) {
  if (out.length !== poly.length) {
    out.length = poly.length;
  }

  for (let i = 0; i < poly.length; i += 2) {
    const v0 = vec2Reset(poly[i], poly[i + 1], TMP_VEC0);
    vec2TransformBy(v0, mat, v0);
    out[i] = v0.x;
    out[i + 1] = v0.y;
  }

  return out;
}
