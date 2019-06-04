import { _vecAlloc } from "../internal/dataClasses";
import { IVec } from "../types";
import { vecNormalize } from "../vecFunctions/vecNormalize";
import { vecSubtract } from "../vecFunctions/vecSubtract";
import { lineAlloc } from "./lineAlloc";
import { lineReset } from "./lineReset";

const TMP0 = _vecAlloc();

export function lineLookAt(from: IVec, to: IVec, out = lineAlloc()) {
  const dir = vecSubtract(to, from, TMP0);
  vecNormalize(dir, dir);
  return lineReset(from.x, from.y, dir.x, dir.y, out);
}
