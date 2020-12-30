import { NearestPointResult } from "../types";
import { nearestPointResultAlloc } from "./nearestPointResultAlloc";
import { nearestPointResultReset } from "./nearestPointResultReset";

/**
 * Copies the values from the given NearestPointResult into a new NearestPointResult object.
 *
 * @param nearestPointResult
 * @param out
 */
export function nearestPointResultClone(nearestPointResult: NearestPointResult, out = nearestPointResultAlloc()) {
  return nearestPointResultReset(
    nearestPointResult.x,
    nearestPointResult.y,
    nearestPointResult.t,
    nearestPointResult.distanceValue,
    out,
  );
}
