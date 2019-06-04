import { polylineTransformByAff } from "../polylineFunctions/polylineTransformByAff";
import { IMat2x3, IPolygon } from "../types";
import { polygonAlloc } from "./polygonAlloc";

export function polygonTransformByAff(poly: IPolygon, mat: IMat2x3, out = polygonAlloc()) {
  return polylineTransformByAff(poly, mat, out);
}
