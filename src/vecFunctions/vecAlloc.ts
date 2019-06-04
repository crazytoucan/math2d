import { IVec } from "../types";

class Vec implements IVec {
  constructor(public x = NaN, public y = NaN) {}
}

/**
 * Creates a new Vec object in memory, with all values initialized to NaN.
 * This is useful to hold the result of vectormath function calls in performance
 * critical workflows.
 */
export function vecAlloc(): IVec {
  return new Vec();
}
