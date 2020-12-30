import { intersectionResultAlloc } from "../intersectionResultFunctions/intersectionResultAlloc";
import { intersectionResultReset } from "../intersectionResultFunctions/intersectionResultReset";
import { polylineGetNumSegments } from "../polylineFunctions/polylineGetNumSegments";
import { polylineGetSegment } from "../polylineFunctions/polylineGetSegment";
import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { IIntersectionResult, IPolyline, ISegment } from "../types";


export function _polylineIntersectHelper<T>(
  poly: IPolyline,
  value: T,
  doIntersectSegment: (segment: ISegment, value: T, out: IIntersectionResult) => IIntersectionResult,
) {
  const tmp0 = segmentAlloc();
  const tmp1 = intersectionResultAlloc();

  const allIntersections: IIntersectionResult[] = [];
  const numSegments = polylineGetNumSegments(poly);
  // prevent repeated intersections at the same vertex in successive segments
  let lastIntersection = NaN;

  for (let i = 0; i < numSegments; i++) {
    const segment = polylineGetSegment(poly, i, tmp0);
    const out = doIntersectSegment(segment, value, tmp1);
    if (out.exists && lastIntersection !== out.t1) {
      lastIntersection = out.t1;
      allIntersections.push(intersectionResultReset(true, out.x, out.y, i + out.t0, out.t1));
    }
  }

  return allIntersections;
}
