import { polylineNearestVertexIndex } from "../polylineFunctions/polylineNearestVertexIndex";
import { IPolygon, IVec } from "../types";

export function polygonNearestVertexIndex(poly: IPolygon, point: IVec) {
  return polylineNearestVertexIndex(poly, point);
}
