import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { segmentReset } from "../segmentFunctions/segmentReset";
import { IPolygon } from "../types";

/**
 * Returns a polygon's side by given index as a segment, starting at 0.
 *
 * The given side index must be in the range [0, N) for a polygon with _N_ vertices:
 * this function does not accommodate "cycling" of polygon side indices. If an out of range
 * index is given, this function returns a segment with all `NaN` values.
 *
 * @param poly the polygon to inspect
 * @param index which side to return, starting with 0
 * @param out
 */
export function polygonGetSideSegment(poly: IPolygon, index: number, out = segmentAlloc()) {
  const start = 2 * index;
  if (start < 0 || start >= poly.length) {
    return segmentReset(NaN, NaN, NaN, NaN, out);
  } else if (start === poly.length - 2) {
    return segmentReset(poly[start], poly[start + 1], poly[0], poly[1]);
  } else {
    return segmentReset(poly[start], poly[start + 1], poly[start + 2], poly[start + 3]);
  }
}
