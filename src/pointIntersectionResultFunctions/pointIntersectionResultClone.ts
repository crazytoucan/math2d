import { IPointIntersectionResult } from "../types";
import { pointIntersectionResultAlloc } from "./pointIntersectionResultAlloc";
import { pointIntersectionResultReset } from "./pointIntersectionResultReset";

/**
 * Copies the values from the given intersection into a new intersection object.
 * @param intersection
 * @param out
 */
export function pointIntersectionResultClone(
  intersection: IPointIntersectionResult,
  out = pointIntersectionResultAlloc(),
) {
  return pointIntersectionResultReset(
    intersection.exists,
    intersection.x,
    intersection.y,
    intersection.t0,
    intersection.t1,
    out,
  );
}
