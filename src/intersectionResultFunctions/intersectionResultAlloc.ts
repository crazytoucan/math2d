import { IntersectionResult } from "../types";

class IntersectionResult implements IntersectionResult {
  public exists = false;
  public x = NaN;
  public y = NaN;
  public t0 = NaN;
  public t1 = NaN;
}

/**
 * Creates a new IntersectionResult object in memory, with all values initialized to `false` and `NaN`.
 * This is useful to hold the result of math2d function calls in performance
 * critical workflows.
 */
export function intersectionResultAlloc(): IntersectionResult {
  return new IntersectionResult();
}
