import { vecAlloc } from "../../src/vecFunctions/vecAlloc";
import { vecReset } from "../../src/vecFunctions/vecReset";

const vec = vecAlloc();

export function fn() {
  vecReset(0, 0, vec);
}
