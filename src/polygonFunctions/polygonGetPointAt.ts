import { _asPolyline } from "../internal/_asPolyline";
import { EPSILON } from "../internal/const";
import { polylineGetPointAt } from "../polylineFunctions/polylineGetPointAt";
import { IPolygon } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";
import { polygonGetPerimeter } from "./polygonGetPerimeter";

export function polygonGetPointAt(poly: IPolygon, t: number, out = vecAlloc()) {
  if (poly.length === 0) {
    return vecReset(NaN, NaN, out);
  }

  const perimeter = polygonGetPerimeter(poly);
  if (perimeter < EPSILON) {
    return vecReset(poly[0], poly[1], out);
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polylineGetPointAt(_asPolyline(poly), t, out);
}
