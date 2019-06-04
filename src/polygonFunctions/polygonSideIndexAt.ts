import { _toPolyline } from "../internal/internalFunctions";
import { EPSILON } from "../internal/parameters";
import { polylineSegmentIndexAt } from "../polylineFunctions/polylineSegmentIndexAt";
import { IPolygon } from "../types";
import { polygonGetPerimeter } from "./polygonGetPerimeter";

export function polygonSideIndexAt(poly: IPolygon, t: number) {
  const perimeter = polygonGetPerimeter(poly);
  if (perimeter < EPSILON) {
    return 0;
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polylineSegmentIndexAt(_toPolyline(poly), t);
}
