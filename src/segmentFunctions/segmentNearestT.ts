import { _clamp } from "../internal/_clamp";
import { EPSILON_SQ } from "../internal/const";
import { ISegment, IVec } from "../types";

export function segmentNearestT(segment: ISegment, point: IVec) {
  const dSegX = segment.x1 - segment.x0;
  const dSegY = segment.y1 - segment.y0;
  const segLengthSq = dSegX * dSegX + dSegY * dSegY;
  if (segLengthSq < EPSILON_SQ) {
    return 0;
  }

  const dot = (point.x - segment.x0) * dSegX + (point.y - segment.y0) * dSegY;
  return _clamp(dot / segLengthSq, 0, 1);
}
