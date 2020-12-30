import { Ray, Vec } from "../types";

export function _dotPerp(ray: Ray, point: Vec) {
  return ray.dirX * (point.y - ray.y0) - ray.dirY * (point.x - ray.x0);
}
