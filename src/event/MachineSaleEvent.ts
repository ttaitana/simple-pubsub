import { IEvent } from "../interface/IEvent";

export class MachineSaleEvent implements IEvent {
  constructor(
    private readonly _sold: number,
    private readonly _machineId: string
  ) {}

  public machineId(): string {
    return this._machineId;
  }

  public getSoldQuantity(): number {
    return this._sold;
  }

  public type(): string {
    return "sale";
  }
}
