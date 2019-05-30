import { IVec2 } from "../types";
import {
  vec2Alloc,
  vec2Subtract,
  vec2Dot,
  vec2GetLengthSquared,
  vec2Distance,
  vec2Normalize,
  vec2Perp,
} from "../functions/vec2Functions";

export interface ISegmentNearestPointResult {
  d: number;
  distance: number;
}

const TMP_VEC0 = vec2Alloc();
const TMP_VEC1 = vec2Alloc();

export function internalGetSegmentNearestPoint(
  vertex0: IVec2,
  vertex1: IVec2,
  point: IVec2,
  out: ISegmentNearestPointResult,
) {
  const dirVec = vec2Subtract(vertex1, vertex0, TMP_VEC0);
  const pVec = vec2Subtract(point, vertex0, TMP_VEC1);
  const dot = vec2Dot(dirVec, pVec);
  const dirVecLengthSquared = vec2GetLengthSquared(dirVec);
  if (dot < 0) {
    out.distance = vec2Distance(point, vertex0);
    out.d = 0;
  } else if (dot > dirVecLengthSquared) {
    out.distance = vec2Distance(point, vertex1);
    out.d = Math.sqrt(dirVecLengthSquared);
  } else {
    vec2Normalize(dirVec, dirVec);
    out.d = vec2Dot(dirVec, pVec);
    vec2Perp(dirVec, dirVec);
    out.distance = Math.abs(vec2Dot(dirVec, pVec));
  }

  return out;
}
