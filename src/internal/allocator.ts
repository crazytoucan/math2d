export interface IAllocator {
  allocArray(slot: number, length: number): number[];
}

class DefaultAllocator implements IAllocator {
  public allocArray(slot: number, length: number) {
    const allocated = this.allocatedSlots[slot][length];
    if (allocated !== undefined) {
      return allocated;
    }

    const nextValue: number[] = [];
    nextValue.length = length;
    this.allocatedSlots[slot][length] = nextValue;
    this.maybeScheduleGc();
    return nextValue;
  }

  private maybeScheduleGc() {
    if (this.scheduledGc === undefined) {
      this.scheduledGc = setTimeout(() => {
        this.scheduledGc = undefined;
        this.allocatedSlots = [[], []];
      }, 5_000);
    }
  }

  private allocatedSlots: number[][][] = [[], []];
  private scheduledGc: number | undefined;
}

export const ALLOCATOR: IAllocator = new DefaultAllocator();
