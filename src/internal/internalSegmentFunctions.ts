import { IVec2, ISegment2 } from "../types";
import {
  vec2Alloc,
  vec2Subtract,
  vec2Dot,
  vec2LengthSq,
  vec2Distance,
  vec2Normalize,
  vec2Perp,
  vec2Reset,
} from "../functions/vec2Functions";

export interface IInternalSegmentGetNearestPointResult {
  d: number;
  distance: number;
}

const TMP_VEC0 = vec2Alloc();
const TMP_VEC1 = vec2Alloc();

export function internalSegmentGetNearestPoint(
  segment: ISegment2,
  point: IVec2,
  out: IInternalSegmentGetNearestPointResult,
) {
  const v0 = vec2Reset(segment.x0, segment.y0, TMP_VEC0);
  const v1 = vec2Reset(segment.x1, segment.y1, TMP_VEC1);
  const dirVec = vec2Subtract(v1, v0, TMP_VEC0);
  const pVec = vec2Subtract(point, v0, TMP_VEC1);
  const dot = vec2Dot(dirVec, pVec);
  const dirVecLengthSq = vec2LengthSq(dirVec);
  if (dot < 0) {
    out.distance = vec2Distance(point, v0);
    out.d = 0;
  } else if (dot > dirVecLengthSq) {
    out.distance = vec2Distance(point, v1);
    out.d = Math.sqrt(dirVecLengthSq);
  } else {
    vec2Normalize(dirVec, dirVec);
    out.d = vec2Dot(dirVec, pVec);
    vec2Perp(dirVec, dirVec);
    out.distance = Math.abs(vec2Dot(dirVec, pVec));
  }

  return out;
}
