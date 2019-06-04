const GC_INTERVAL_MS = 5_000;

// tslint:disable-next-line:class-name
export class _Allocator {
  public allocTempArray<T>(length: number) {
    const allocated = this.pool[length];
    if (allocated !== undefined) {
      return allocated;
    }

    const nextValue: T[] = [];
    nextValue.length = length;
    this.pool[length] = nextValue;
    this.maybeScheduleGc();
    return nextValue;
  }

  private maybeScheduleGc() {
    if (this.scheduledGc === undefined) {
      this.scheduledGc = setTimeout(() => {
        this.scheduledGc = undefined;
        this.pool = [[], []];
      }, GC_INTERVAL_MS) as any;
    }
  }

  private pool: any[][] = [[], []];
  private scheduledGc: number | undefined;
}
