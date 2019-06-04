import { IIntersection } from "../types";
import { intersectionAlloc } from "./intersectionAlloc";
import { intersectionReset } from "./intersectionReset";

/**
 * Copies the values from the given intersection into a new intersection object.
 * @param intersection
 * @param out
 */
export function intersectionClone(intersection: IIntersection, out = intersectionAlloc()) {
  return intersectionReset(intersection.exists, intersection.x, intersection.y, intersection.t0, intersection.t1, out);
}
