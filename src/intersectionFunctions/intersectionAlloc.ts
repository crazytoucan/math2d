import { IIntersection } from "../types";

class Intersection implements IIntersection {
  constructor(public exists = false, public x = NaN, public y = NaN, public t0 = NaN, public t1 = NaN) {}
}

/**
 * Creates a new Intersection object in memory, with all values initialized to `false` and `NaN`.
 * This is useful to hold the result of vectormath function calls in performance
 * critical workflows.
 */
export function intersectionAlloc(): IIntersection {
  return new Intersection();
}
