import { IVec } from "../types";

class Vec implements IVec {
  constructor(public x = NaN, public y = NaN) {}
}

/**
 * Creates a new Vec object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `vecAlloc()` are useful to hold results of
 * Vectormath function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = vecAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `vecNormalize()`.
 *    // This avoids a heap allocation.
 *    const result = vecNormalize(existingObj.velocity, TMP0);
 *  }
 */
export function vecAlloc(): IVec {
  return new Vec();
}
