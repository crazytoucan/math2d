import { IntersectionResult } from "../types";
import { _intersectionSwapTs } from "./_intersectionSwapTs";

function sortByT0Increasing(a: IntersectionResult, b: IntersectionResult) {
  return a.t0 < b.t0 ? -1 : a.t0 > b.t0 ? 1 : 0;
}

export function _swapAndReorderIntersections(intersections: IntersectionResult[]) {
  intersections.forEach(_intersectionSwapTs);
  intersections.sort(sortByT0Increasing);
  return intersections;
}
