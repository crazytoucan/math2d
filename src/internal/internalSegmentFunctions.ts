import { IVec, ISegment } from "../types";
import {
  vecAlloc,
  vecSubtract,
  vecDot,
  vecGetLengthSq,
  vecDistance,
  vecNormalize,
  vecPerp,
  vecReset,
} from "../functions/vecFunctions";

export interface IInternalSegmentGetNearestPointResult {
  d: number;
  distance: number;
}

const TMP_VEC0 = vecAlloc();
const TMP_VEC1 = vecAlloc();

export function internalSegmentGetNearestPoint(
  segment: ISegment,
  point: IVec,
  out: IInternalSegmentGetNearestPointResult,
) {
  const v0 = vecReset(segment.x0, segment.y0, TMP_VEC0);
  const v1 = vecReset(segment.x1, segment.y1, TMP_VEC1);
  const dirVec = vecSubtract(v1, v0, TMP_VEC0);
  const pVec = vecSubtract(point, v0, TMP_VEC1);
  const dot = vecDot(dirVec, pVec);
  const dirVecLengthSq = vecGetLengthSq(dirVec);
  if (dot < 0) {
    out.distance = vecDistance(point, v0);
    out.d = 0;
  } else if (dot > dirVecLengthSq) {
    out.distance = vecDistance(point, v1);
    out.d = Math.sqrt(dirVecLengthSq);
  } else {
    vecNormalize(dirVec, dirVec);
    out.d = vecDot(dirVec, pVec);
    vecPerp(dirVec, dirVec);
    out.distance = Math.abs(vecDot(dirVec, pVec));
  }

  return out;
}
