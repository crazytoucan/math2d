import { segmentAlloc } from "../segmentFunctions/segmentAlloc";
import { segmentReset } from "../segmentFunctions/segmentReset";
import { IPolygon } from "../types";

export function polygonGetSideSegment(poly: IPolygon, index: number, out = segmentAlloc()) {
  if (poly.length === 0) {
    return segmentReset(NaN, NaN, NaN, NaN, out);
  } else if (index === poly.length / 2) {
    return segmentReset(poly[poly.length - 2], poly[poly.length - 1], poly[0], poly[1]);
  } else {
    const l = 2 * index;
    return segmentReset(poly[l], poly[l + 1], poly[l + 2], poly[l + 3], out);
  }
}
