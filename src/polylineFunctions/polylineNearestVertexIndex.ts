import { IPolyline, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecDistanceSq } from "../vecFunctions/vecDistanceSq";
import { vecReset } from "../vecFunctions/vecReset";
import { polylineGetNumSegments } from "./polylineGetNumSegments";

const TMP0 = vecAlloc();

/**
 * Computes the index of the nearest vertex of the polyline to a given reference point
 *
 * @param poly
 * @param point
 */
export function polylineNearestVertexIndex(poly: IPolyline, point: IVec) {
  let winningDistanceSq = Infinity;
  let winningIndex = NaN;
  const len = polylineGetNumSegments(poly);
  for (let i = 0; i < len; i++) {
    const v0 = vecReset(poly[2 * i], poly[2 * i + 1], TMP0);
    const distanceSq = vecDistanceSq(point, v0);
    if (distanceSq < winningDistanceSq) {
      winningDistanceSq = distanceSq;
      winningIndex = i;
    }
  }

  return winningIndex;
}
