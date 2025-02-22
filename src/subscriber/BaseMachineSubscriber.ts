import { Machine } from "../entity/Machine";
import { IEvent } from "../interface/IEvent";
import { ISubscriber } from "../interface/ISubScriber";
import { MachineRepository } from "../repository/MachineRepository";

export abstract class BaseMachineSubscriber implements ISubscriber {
  protected machinesId: string[];
  protected machineRepository: MachineRepository;

  constructor(machineRepository: MachineRepository, machines: Machine[]) {
    this.machineRepository = machineRepository;
    this.machinesId = machines.map((m) => m.getId());
  }

  public addSubscriber(machine: Machine): void {
    if (this.findmachineId(machine.getId())) {
      console.error(`Machine Id ${machine.getId()} already subscribe.`);
      return;
    }
    this.machinesId.push(machine.getId());
  }

  public removeSubscriber(machine: Machine): void {
    const index = this.machinesId.findIndex((m) => m === machine.getId());
    if (index === -1) {
      console.error(`Machine Id ${machine.getId()} not found.`);
      return;
    }
    this.machinesId.splice(index, 1);
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
