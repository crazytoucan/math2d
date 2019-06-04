import { IPolyline } from "../types";

export function polylineGetSegmentLength(poly: IPolyline, idx: number) {
  const l = 2 * idx;
  const dx = poly[l + 2] - poly[l];
  const dy = poly[l + 3] - poly[l + 1];
  return Math.sqrt(dx * dx + dy * dy);
}
