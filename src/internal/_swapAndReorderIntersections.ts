import { IIntersectionResult } from "../types";
import { _intersectionSwapTs } from "./_intersectionSwapTs";

function sortByT0Increasing(a: IIntersectionResult, b: IIntersectionResult) {
  return a.t0 < b.t0 ? -1 : a.t0 > b.t0 ? 1 : 0;
}

export function _swapAndReorderIntersections(intersections: IIntersectionResult[]) {
  intersections.forEach(_intersectionSwapTs);
  intersections.sort(sortByT0Increasing);
  return intersections;
}
