import { _dot } from "../internal/_dot";
import { _intersectionDNE } from "../internal/_intersectionDNE";
import { _lineTransformByOrtho } from "../internal/_lineTransformByOrtho";
import { EPSILON } from "../internal/const";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { intersectionReset } from "../intersectionFunctions/intersectionReset";
import { mat2x3Alloc } from "../mat2x3Functions/mat2x3Alloc";
import { mat2x3Reset } from "../mat2x3Functions/mat2x3Reset";
import { ILine } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { lineAlloc } from "./lineAlloc";
import { linePointAt } from "./linePointAt";

const TMP0 = mat2x3Alloc();
const TMP1 = lineAlloc();
const TMP2 = vecAlloc();

export function lineIntersectLine(a: ILine, b: ILine, out = intersectionAlloc()) {
  const transform = mat2x3Reset(a.dirX, -a.dirY, a.dirY, a.dirX, -a.x0, -a.y0, TMP0);
  const localB = _lineTransformByOrtho(b, transform, TMP1);
  const isParallel = Math.abs(localB.dirY) < EPSILON;

  if (isParallel && Math.abs(localB.y0) < EPSILON) {
    return intersectionReset(true, a.x0, a.y0, 0, -localB.x0 * localB.dirX, out);
  } else if (isParallel) {
    return _intersectionDNE(out);
  } else {
    const t0 = localB.x0 - (localB.dirX / localB.dirY) * localB.y0;
    const intersectionPoint = linePointAt(a, t0, TMP2);
    const t1 = _dot(b, intersectionPoint);
    return intersectionReset(true, intersectionPoint.x, intersectionPoint.y, t0, t1, out);
  }
}
