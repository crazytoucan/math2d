import { IBox } from "../types";

class Box implements IBox {
  constructor(public minX = NaN, public minY = NaN, public maxX = NaN, public maxY = NaN) {}
}

/**
 * Creates a new Box object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like boxAlloc() are useful to hold results of
 * Vectormath function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 * const TMP_BOX = boxAlloc();
 *
 * // Use this temp memory to hold results of function calls.
 * // This avoids a heap allocation.
 * const result = polygonGetBounds(myPolygon, TMP_BOX);
 */
export function boxAlloc(): IBox {
  return new Box();
}
