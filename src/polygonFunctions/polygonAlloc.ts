import { IPolygon } from "../types";

/**
 * Creates a new Array object in memory to hold Polygon data.
 * Its initial length is 0.
 *
 * Data allocation functions like `polygonAlloc()` are useful to hold results of
 * Vectormath function calls in inner loops of performance critical workflows.
 *
 * As with any optimization, you don't need it until you've profiled your
 * application! Getting into temp variable management and shared state can
 * severely hurt code readability and maintainability, so it's best to avoid
 * such optimization if you can.
 *
 * @example
 *  // initialize temp memory
 *  const TMP0 = polygonAlloc();
 *
 *  ... {
 *    // Use this temp memory to hold result of `polygonTransformByAff()`.
 *    // This will avoid a heap allocation if the array doesn't have to be resized.
 *    const result = polygonTransformByAff(existingObj.geometry, existingObj.transform, TMP0);
 *  }
 */
export function polygonAlloc(): IPolygon {
  return [];
}
