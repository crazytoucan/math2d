// tslint:disable:use-named-parameter
export function _arrayReset<T>(out: T[], ...vals: T[]): void;
export function _arrayReset() {
  const out = arguments[0] as any[];
  const len = arguments.length - 1;
  if (out.length !== len) {
    out.length = len;
  }

  for (let i = 0; i < len; i++) {
    out[i] = arguments[i + 1];
  }
}
