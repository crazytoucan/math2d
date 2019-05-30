import { IVec } from "../types";
import {
  vecAlloc,
  vecSubtract,
  vecDot,
  vecGetLengthSquared,
  vecDistance,
  vecNormalize,
  vecPerp,
} from "../functions/vecFunctions";

export interface ISegmentNearestPointResult {
  d: number;
  distance: number;
}

const TMP_VEC0 = vecAlloc();
const TMP_VEC1 = vecAlloc();

export function internalGetSegmentNearestPoint(
  vertex0: IVec,
  vertex1: IVec,
  point: IVec,
  out: ISegmentNearestPointResult,
) {
  const dirVec = vecSubtract(vertex1, vertex0, TMP_VEC0);
  const pVec = vecSubtract(point, vertex0, TMP_VEC1);
  const dot = vecDot(dirVec, pVec);
  const dirVecLengthSquared = vecGetLengthSquared(dirVec);
  if (dot < 0) {
    out.distance = vecDistance(point, vertex0);
    out.d = 0;
  } else if (dot > dirVecLengthSquared) {
    out.distance = vecDistance(point, vertex1);
    out.d = Math.sqrt(dirVecLengthSquared);
  } else {
    vecNormalize(dirVec, dirVec);
    out.d = vecDot(dirVec, pVec);
    vecPerp(dirVec, dirVec);
    out.distance = Math.abs(vecDot(dirVec, pVec));
  }

  return out;
}
