import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { intersectionReset } from "../intersectionFunctions/intersectionReset";
import { polylineGetNumSegments } from "../polylineFunctions/polylineGetNumSegments";
import { polylineGetSegment } from "../polylineFunctions/polylineGetSegment";
import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { segmentGetLength } from "../segmentFunctions/segmentGetLength";
import { IIntersection, IPolyline, ISegment } from "../types";

const TMP0 = segmentAlloc();
const TMP1 = intersectionAlloc();

export function _polylineIntersectIteratorHelper<T>(
  poly: IPolyline,
  value: T,
  doIntersectSegment: (segment: ISegment, value: T, out: IIntersection) => IIntersection,
) {
  const allIntersections: IIntersection[] = [];
  const numSegments = polylineGetNumSegments(poly);
  let traversed = 0;
  for (let i = 0; i < numSegments; i++) {
    const segment = polylineGetSegment(poly, i, TMP0);
    const segmentLength = segmentGetLength(segment);
    const out = doIntersectSegment(segment, value, TMP1);
    if (out.exists) {
      allIntersections.push(intersectionReset(true, out.x, out.y, traversed + out.t0 * segmentLength, out.t1));
    }

    traversed += segmentLength;
  }

  return allIntersections;
}
