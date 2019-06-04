import { _intersectionSwap } from "../internal/internalFunctions";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { lineIntersectSegment } from "../lineFunctions/lineIntersectSegment";
import { ILine, ISegment } from "../types";

export function segmentIntersectLine(segment: ISegment, line: ILine, out = intersectionAlloc()) {
  return _intersectionSwap(lineIntersectSegment(line, segment, out));
}
