import { IPolyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { polylineAlloc } from "./polylineAlloc";
import { polylineGetLength } from "./polylineGetLength";
import { polylineGetVertex } from "./polylineGetVertex";
import { polylinePointAt } from "./polylinePointAt";
import { polylineSegmentIndexAt } from "./polylineSegmentIndexAt";

const TMP0 = vecAlloc();

export function polylineTrim(poly: IPolyline, begin: number, end: number, out = polylineAlloc()) {
  if (begin > end || poly.length === 0) {
    out.length = 0;
    return;
  }

  begin = Math.max(begin, 0);
  end = Math.min(end, polylineGetLength(poly));
  const beginSegmentIdx = polylineSegmentIndexAt(poly, begin);
  const endSegmentIdx = polylineSegmentIndexAt(poly, end);
  out.length = 2 * (2 + endSegmentIdx - beginSegmentIdx);
  let cursor = 0;

  const vBegin = polylinePointAt(poly, begin, TMP0);
  out[cursor++] = vBegin.x;
  out[cursor++] = vBegin.y;

  for (let idx = beginSegmentIdx; idx < endSegmentIdx; idx++) {
    const vertex = polylineGetVertex(poly, idx + 1, TMP0);
    out[cursor++] = vertex.x;
    out[cursor++] = vertex.y;
  }

  const vEnd = polylinePointAt(poly, end, TMP0);
  out[cursor++] = vEnd.x;
  out[cursor++] = vEnd.y;
  return out;
}
