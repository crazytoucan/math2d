import { ILine, IMat2x3 } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";
import { vecTransformByAff } from "../vecFunctions/vecTransformByAff";
import { lineAlloc } from "./lineAlloc";
import { lineLookAt } from "./lineLookAt";

const TMP0 = vecAlloc();
const TMP1 = vecAlloc();

export function lineTransformByAff(line: ILine, mat: IMat2x3, out = lineAlloc()) {
  const initial = vecReset(line.x0, line.y0, TMP0);
  vecTransformByAff(initial, mat, initial);
  const other = vecReset(line.x0 + line.dirX, line.y0 + line.dirY, TMP1);
  vecTransformByAff(other, mat, other);
  return lineLookAt(initial, other, out);
}
