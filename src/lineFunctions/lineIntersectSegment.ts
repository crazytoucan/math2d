import { _intersectionDNE } from "../internal/_intersectionDNE";
import { _lookAt } from "../internal/_lookAt";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { segmentGetLength } from "../segmentFunctions/segmentGetLength";
import { ILine, ISegment } from "../types";
import { lineAlloc } from "./lineAlloc";
import { lineIntersectLine } from "./lineIntersectLine";

const TMP0 = lineAlloc();

export function lineIntersectSegment(line: ILine, segment: ISegment, out = intersectionAlloc()) {
  // TODO: https://github.com/crazytoucan/geometry/issues/1
  const segmentLine = _lookAt(segment.x0, segment.y0, segment.x1, segment.y1, TMP0);
  const segmentLength = segmentGetLength(segment);
  lineIntersectLine(line, segmentLine, out);
  if (!out.exists || out.t1 < 0 || out.t1 > segmentLength) {
    return _intersectionDNE(out);
  } else {
    out.t1 /= segmentLength;
    return out;
  }
}
