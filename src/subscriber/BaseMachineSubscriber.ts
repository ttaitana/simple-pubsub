import { Machine } from "../entity/Machine";
import { MachineRefillEvent } from "../event/MachineRefillEvent";
import { IEvent } from "../interface/IEvent";
import { ISubscriber } from "../interface/ISubScriber";

export abstract class BaseMachineSubscriber implements ISubscriber {
  protected machinesId: string[];

  constructor(machines: Machine[]) {
    this.machinesId = machines.map((m) => m.getId());
  }

  public addSubscriber(machine: Machine): void {
    if (this.findmachineId(machine.getId())) {
      console.error(`Machine Id ${machine.getId()} already subscribe.`);
      return;
    }
    this.machinesId.push(machine.getId());
  }

  protected findmachineId(machineId: String): string| undefined {
    return this.machinesId.find((m) => m === machineId);
  }

  protected isMachineIdValid(machineId: string): boolean {
    const existMachineId = this.findmachineId(machineId);
    if (!existMachineId) {
      return false;
    }
    return true;
  }

  public abstract handle(event: IEvent): void;
}
