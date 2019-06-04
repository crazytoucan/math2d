import { _vecAlloc } from "../internal/dataClasses";
import { IPolyline, IVec } from "../types";
import { vecDistanceSq } from "../vecFunctions/vecDistanceSq";
import { vecReset } from "../vecFunctions/vecReset";
import { polylineGetNumSegments } from "./polylineGetNumSegments";

const TMP_polylineNearestVertexIndex_0 = _vecAlloc();
export function polylineNearestVertexIndex(poly: IPolyline, point: IVec) {
  let winningDistanceSq = Infinity;
  let winningIndex = NaN;
  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const v0 = vecReset(poly[2 * i], poly[2 * i + 1], TMP_polylineNearestVertexIndex_0);
    const distanceSq = vecDistanceSq(point, v0);
    if (distanceSq < winningDistanceSq) {
      winningDistanceSq = distanceSq;
      winningIndex = i;
    }
  }

  return winningIndex;
}
