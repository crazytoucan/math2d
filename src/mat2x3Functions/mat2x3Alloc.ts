import { IMat2x3 } from "../types";

class Mat2x3 implements IMat2x3 {
  constructor(public a = NaN, public b = NaN, public c = NaN, public d = NaN, public e = NaN, public f = NaN) {}
}

/**
 * Creates a new Mat2x3 object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `mat2x3Alloc()` are useful to hold results of
 * Vectormath function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = mat2x3Alloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `mat2x3AffInvert()`.
 *    // This avoids a heap allocation.
 *    const result = mat2x3AffInvert(existingObj.transform, TMP0);
 *  }
 */
export function mat2x3Alloc(): IMat2x3 {
  return new Mat2x3();
}
