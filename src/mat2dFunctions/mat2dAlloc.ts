import { Mat2d } from "../types";

class _Mat2d implements Mat2d {
  public a = NaN;
  public b = NaN;
  public c = NaN;
  public d = NaN;
  public e = NaN;
  public f = NaN;
}

/**
 * Creates a new mat2d object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `mat2dAlloc()` are useful to hold results of
 * Math2d function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = mat2dAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `mat2dInvert()`.
 *    // This avoids a heap allocation.
 *    const result = mat2dInvert(existingObj.transform, TMP0);
 *  }
 */
export function mat2dAlloc(): Mat2d {
  return new _Mat2d();
}
