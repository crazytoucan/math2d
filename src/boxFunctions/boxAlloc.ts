import { IBox } from "../types";

class Box implements IBox {
  public minX = NaN;
  public minY = NaN;
  public maxX = NaN;
  public maxY = NaN;
}

/**
 * Creates a new Box object in memory, with all values initialized to `NaN`.
 *
 * Data allocation functions like `boxAlloc()` are useful to hold results of
 * Math2d function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = boxAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `polygonGetBounds()`.
 *    // This avoids a heap allocation.
 *    const result = polygonGetBounds(existingObj.geometry, TMP0);
 *  }
 */
export function boxAlloc(): IBox {
  return new Box();
}
