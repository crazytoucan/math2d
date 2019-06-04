import { _intersectionSwapTs } from "../internal/_intersectionSwapTs";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { lineIntersectSegment } from "../lineFunctions/lineIntersectSegment";
import { ILine, ISegment } from "../types";

export function segmentIntersectLine(segment: ISegment, line: ILine, out = intersectionAlloc()) {
  return _intersectionSwapTs(lineIntersectSegment(line, segment, out));
}
