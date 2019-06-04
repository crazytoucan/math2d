import { _lookAt } from "../internal/_lookAt";
import { IVec } from "../types";
import { rayAlloc } from "./rayAlloc";

export function rayLookAt(from: IVec, to: IVec, out = rayAlloc()) {
  return _lookAt(from.x, from.y, to.x, to.y, out);
}
