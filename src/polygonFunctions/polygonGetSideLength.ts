import { segmentGetLength } from "../segmentFunctions/segmentGetLength";
import { IPolygon } from "../types";
import { polygonGetSideSegment } from "./polygonGetSideSegment";

/**
 * Returns the length of a polygon's side by index, starting at 0.
 *
 * The given side index must be in the range [0, N) for a polygon with _N_ vertices:
 * this function does not accommodate "cycling" of polygon side indices.
 *
 * @param poly the polygon whose side should be measured
 * @param idx the side index to measure, starting at 0
 */
export function polygonGetSideLength(poly: IPolygon, idx: number) {
  return segmentGetLength(polygonGetSideSegment(poly, idx));
}
