import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { segmentNearestT } from "../segmentFunctions/segmentNearestT";
import { segmentPointAt } from "../segmentFunctions/segmentPointAt";
import { IPolyline, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecDistanceSq } from "../vecFunctions/vecDistanceSq";
import { polylineGetNumSegments } from "./polylineGetNumSegments";
import { polylineGetSegment } from "./polylineGetSegment";
import { polylineGetSegmentLength } from "./polylineGetSegmentLength";

const TMP0 = segmentAlloc();
const TMP1 = vecAlloc();

export function polylineNearestT(poly: IPolyline, point: IVec) {
  let winningDistanceSq = Infinity;
  let winningD = NaN;

  let traversed = 0;
  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const segment = polylineGetSegment(poly, i, TMP0);
    const segmentT = segmentNearestT(segment, point);
    const segmentLength = polylineGetSegmentLength(poly, i);

    const closestPointOnSegment = segmentPointAt(segment, segmentT, TMP1);
    const distanceSq = vecDistanceSq(point, closestPointOnSegment);
    if (distanceSq < winningDistanceSq) {
      winningDistanceSq = distanceSq;
      winningD = traversed + segmentT * segmentLength;
    }

    traversed += segmentLength;
  }

  return winningD;
}
