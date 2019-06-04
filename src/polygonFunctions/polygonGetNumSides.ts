import { IPolygon } from "../types";

export function polygonGetNumSides(poly: IPolygon) {
  return poly.length / 2;
}
