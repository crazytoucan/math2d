export interface IVec {
  x: number;
  y: number;
}

export interface ISegment {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

export interface IRay {
  x0: number;
  y0: number;
  dirX: number;
  dirY: number;
}

export interface IAffineMatrix {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}

export interface IAabb {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export type IPolygon = number[];
export type IPolyline = number[];
