import { IPolyline } from "../types";

export function polylineReset(x0: number, y0: number, out?: IPolyline): IPolyline;
export function polylineReset(x0: number, y0: number, x1: number, y1: number, out?: IPolyline): IPolyline;
export function polylineReset(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  out?: IPolyline,
): IPolyline;
export function polylineReset(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  ...rest: (number | IPolyline)[]
): IPolyline;
export function polylineReset() {
  if (arguments.length === 0) {
    return [];
  }

  const isLastArgArray = Array.isArray(arguments[arguments.length - 1]);
  const out: IPolyline = isLastArgArray ? arguments[arguments.length - 1] : [];
  const len = isLastArgArray ? arguments.length - 1 : arguments.length;

  if (out.length !== len) {
    out.length = len;
  }

  for (let i = 0; i < len; i++) {
    out[i] = arguments[i];
  }

  return out;
}
