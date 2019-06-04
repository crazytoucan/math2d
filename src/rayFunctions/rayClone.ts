import { IRay } from "../types";
import { rayAlloc } from "./rayAlloc";
import { rayReset } from "./rayReset";

export function rayClone(ray: IRay, out = rayAlloc()) {
  return rayReset(ray.x0, ray.y0, ray.dirX, ray.dirY, out);
}
