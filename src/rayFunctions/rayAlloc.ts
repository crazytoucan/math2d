import { Ray } from "../types";

class _Ray implements Ray {
  public x0 = NaN;
  public y0 = NaN;
  public dirX = NaN;
  public dirY = NaN;
}

/**
 * Creates a new Ray object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `rayAlloc()` are useful to hold results of
 * Math2d function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = rayAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `rayLookAt()`.
 *    // This avoids a heap allocation.
 *    const result = rayLookAt(existingObj.source, existingObj.target, TMP0);
 *  }
 */
export function rayAlloc(): Ray {
  return new _Ray();
}
