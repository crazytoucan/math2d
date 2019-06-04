import { _vecAlloc } from "../internal/dataClasses";
import { IPolyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecLerp } from "../vecFunctions/vecLerp";
import { vecReset } from "../vecFunctions/vecReset";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetSegmentLength } from "./polylineGetSegmentLength";

const TMP_polylinePointAt_0 = _vecAlloc();
const TMP_polylinePointAt_1 = _vecAlloc();
export function polylinePointAt(poly: IPolyline, d: number, out = vecAlloc()) {
  if (d < 0) {
    return vecReset(NaN, NaN, out);
  }

  const len = polylineGetNumSegments(poly);
  let idx = 0;
  while (idx < len) {
    const segmentLength = polylineGetSegmentLength(poly, idx);
    if (d <= segmentLength) {
      const v0 = vecReset(poly[2 * idx], poly[2 * idx + 1], TMP_polylinePointAt_0);
      const v1 = vecReset(poly[2 * idx + 2], poly[2 * idx + 3], TMP_polylinePointAt_1);
      return vecLerp(v0, v1, d / segmentLength, out);
    } else {
      d -= segmentLength;
      ++idx;
    }
  }

  return vecReset(NaN, NaN, out);
}
