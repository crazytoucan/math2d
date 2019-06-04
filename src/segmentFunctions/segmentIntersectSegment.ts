import { _intersectionDNE, _rayLookAt } from "../internal/internalFunctions";
import { EPSILON } from "../internal/parameters";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { lineAlloc } from "../lineFunctions/lineAlloc";
import { lineIntersectSegment } from "../lineFunctions/lineIntersectSegment";
import { ISegment } from "../types";
import { segmentGetLength } from "./segmentGetLength";

const TMP0 = lineAlloc();

export function segmentIntersectSegment(a: ISegment, b: ISegment, out = intersectionAlloc()) {
  const aLine = _rayLookAt(a.x0, a.y0, a.x1, a.y1, TMP0);
  lineIntersectSegment(aLine, b, out);
  const segmentLength = segmentGetLength(a);
  if (out.exists && out.t0 > -EPSILON && out.t0 < segmentLength + EPSILON) {
    out.t0 /= segmentLength;
    return out;
  } else {
    return _intersectionDNE(out);
  }
}
