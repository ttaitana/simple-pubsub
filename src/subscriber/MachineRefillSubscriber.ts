import { Machine } from "../entity/Machine";
import { MachineRefillEvent } from "../event/MachineRefillEvent";
import { MachineRepository } from "../repository/MachineRepository";
import { BaseMachineSubscriber } from "./BaseMachineSubscriber";

export class MachineRefillSubscriber extends BaseMachineSubscriber {
  constructor(machines: Machine[]) {
    super(machines);
  }

  handle(event: MachineRefillEvent): void {
    if (!this.isMachineIdValid(event.machineId())) {
      console.error(`Invalid Machine Id ${event.machineId()}`);
      return;
    }

    const machine = MachineRepository.findMachineById(event.machineId());
    if (!machine) {
      console.error(`Invalid Machine Id ${event.machineId()}`);
      return;
    }

    machine.setStockLevel(machine.getStockLevel() + event.refillQuantity());

    console.log(
      `Machine ${machine.getId()} refilled with ${event.refillQuantity()} items. New stock: ${machine.getStockLevel()}`
    );
  }
}
