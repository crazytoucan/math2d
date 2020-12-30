import { NearestPointResult } from "../types";

class _NearestPointResult implements NearestPointResult {
  public x = NaN;
  public y = NaN;
  public t = NaN;
  public distanceValue = NaN;
}

/**
 * Creates a new NearestPointResult object in memory, with all values initialized to `NaN`.
 * This is useful to hold the result of math2d function calls in performance
 * critical workflows.
 */
export function nearestPointResultAlloc(): NearestPointResult {
  return new _NearestPointResult();
}
