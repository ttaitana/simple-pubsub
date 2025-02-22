import { IEvent } from "../interface/IEvent";

export class MachineStockOkEvent implements IEvent {
  constructor(
    private readonly _stockTreshhold: number,
    private readonly _machineId: string
  ) {}

  public type(): string {
    return "stockLevel";
  }
  public machineId(): string {
    return this._machineId;
  }
  public getThreshold(): number {
    return this._stockTreshhold;
  }
}
