import { ILine } from "../types";

class Line implements ILine {
  constructor(public x0 = NaN, public y0 = NaN, public dirX = NaN, public dirY = NaN) {}
}

/**
 * Creates a new Line object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like lineAlloc() are useful to hold results of
 * Vectormath function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *   // initialize temp memory
 *  const TMP0 = lineAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold the result of `lineThroughPoints()`.
 *    // This avoids a heap allocation.
 *    const result = lineThroughPoints(existingObj.from, existingObj.to, TMP0);
 *  }
 */
export function lineAlloc(): ILine {
  return new Line();
}
