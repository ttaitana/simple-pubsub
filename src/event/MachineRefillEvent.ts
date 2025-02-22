import { IEvent } from "../interface/IEvent";

export class MachineRefillEvent implements IEvent {
  constructor(
    private readonly _refill: number,
    private readonly _machineId: string
  ) {}

  public machineId(): string {
    return this._machineId;
  }

  public refillQuantity(): number {
    return this._refill;
  }

  public type(): string {
    return "refill";
  }
}
