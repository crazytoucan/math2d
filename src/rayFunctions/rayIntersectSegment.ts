import { _intersectionDNE, _rayLookAt } from "../internal/internalFunctions";
import { EPSILON } from "../internal/parameters";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { lineAlloc } from "../lineFunctions/lineAlloc";
import { lineIntersectLine } from "../lineFunctions/lineIntersectLine";
import { IRay, ISegment } from "../types";
import { segmentGetLength } from "./segmentFunctions";

const TMP0 = lineAlloc();

export function rayIntersectSegment(ray: IRay, segment: ISegment, out = intersectionAlloc()) {
  const segmentRay = _rayLookAt(segment.x0, segment.y0, segment.x1, segment.y1, TMP0);
  lineIntersectLine(ray, segmentRay, out);
  const segmentLength = segmentGetLength(segment);
  if (out.exists && out.t0 > -EPSILON && out.t1 > -EPSILON && out.t1 < segmentLength + EPSILON) {
    out.t1 /= segmentLength;
    return out;
  } else {
    return _intersectionDNE(out);
  }
}
