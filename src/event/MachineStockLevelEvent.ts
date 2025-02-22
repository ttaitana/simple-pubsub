import { IEvent } from "../interface/IEvent";

export class MachineStockLevelEvent implements IEvent {
  constructor(
    private readonly _machineId: string
  ) {}

  public type(): string {
    return "stockLevel";
  }
  public machineId(): string {
    return this._machineId;
  }
}
