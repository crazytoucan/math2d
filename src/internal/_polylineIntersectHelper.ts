import { pointIntersectionResultAlloc } from "../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { pointIntersectionResultReset } from "../pointIntersectionResultFunctions/pointIntersectionResultReset";
import { polylineGetNumSegments } from "../polylineFunctions/polylineGetNumSegments";
import { polylineGetSegment } from "../polylineFunctions/polylineGetSegment";
import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { IPointIntersectionResult, IPolyline, ISegment } from "../types";


export function _polylineIntersectHelper<T>(
  poly: IPolyline,
  value: T,
  doIntersectSegment: (segment: ISegment, value: T, out: IPointIntersectionResult) => IPointIntersectionResult,
) {
  const tmp0 = segmentAlloc();
  const tmp1 = pointIntersectionResultAlloc();

  const allIntersections: IPointIntersectionResult[] = [];
  const numSegments = polylineGetNumSegments(poly);
  for (let i = 0; i < numSegments; i++) {
    const segment = polylineGetSegment(poly, i, tmp0);
    const out = doIntersectSegment(segment, value, tmp1);
    if (out.exists) {
      allIntersections.push(pointIntersectionResultReset(true, out.x, out.y, i + out.t0, out.t1));
    }
  }

  return allIntersections;
}
