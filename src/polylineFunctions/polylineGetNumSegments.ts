import { IPolyline } from "../types";

export function polylineGetNumSegments(poly: IPolyline) {
  return poly.length / 2 - 1;
}
