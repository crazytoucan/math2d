import { _intersectionDNE } from "../internal/_intersectionDNE";
import { _lookAt } from "../internal/_lookAt";
import { EPSILON } from "../internal/const";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { lineAlloc } from "../lineFunctions/lineAlloc";
import { lineIntersectLine } from "../lineFunctions/lineIntersectLine";
import { segmentGetLength } from "../segmentFunctions/segmentGetLength";
import { IRay, ISegment } from "../types";

const TMP0 = lineAlloc();

export function rayIntersectSegment(ray: IRay, segment: ISegment, out = intersectionAlloc()) {
  const segmentRay = _lookAt(segment.x0, segment.y0, segment.x1, segment.y1, TMP0);
  lineIntersectLine(ray, segmentRay, out);
  const segmentLength = segmentGetLength(segment);
  if (out.exists && out.t0 > -EPSILON && out.t1 > -EPSILON && out.t1 < segmentLength + EPSILON) {
    out.t1 /= segmentLength;
    return out;
  } else {
    return _intersectionDNE(out);
  }
}
