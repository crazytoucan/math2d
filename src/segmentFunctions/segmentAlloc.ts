import { ISegment } from "../types";

class Segment implements ISegment {
  constructor(public x0 = NaN, public y0 = NaN, public x1 = NaN, public y1 = NaN) {}
}

/**
 * Creates a new Segment object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `segmentAlloc()` are useful to hold results of
 * Math2d function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = segmentAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `polygonGetSideSegment()`.
 *    // This avoids a heap allocation.
 *    const result = polygonGetSideSegment(existingObj.geometry, 0, TMP0);
 *  }
 */
export function segmentAlloc(): ISegment {
  return new Segment();
}
