import { IntersectionResult } from "../types";
import { intersectionResultAlloc } from "./intersectionResultAlloc";
import { intersectionResultReset } from "./intersectionResultReset";

/**
 * Copies the values from the given intersection into a new intersection object.
 * @param intersection
 * @param out
 */
export function intersectionResultClone(
  intersection: IntersectionResult,
  out = intersectionResultAlloc(),
) {
  return intersectionResultReset(
    intersection.exists,
    intersection.x,
    intersection.y,
    intersection.t0,
    intersection.t1,
    out,
  );
}
