import { Machine } from "../entity/Machine";
import { MachineRefillEvent } from "../event/MachineRefillEvent";
import { MachineRepository } from "../repository/MachineRepository";
import { BaseMachineSubscriber } from "./BaseMachineSubscriber";

export class MachineRefillSubscriber extends BaseMachineSubscriber {
  constructor(machineRepository: MachineRepository, machines: Machine[]) {
    super(machineRepository, machines);
  }

  handle(event: MachineRefillEvent): void {
    if (!this.isMachineIdValid(event.machineId())) {
      console.error(`Machine Id ${event.machineId()} not subscribe to refill event.`);
      return;
    }

    const machine = this.machineRepository.findMachineById(event.machineId());
    if (!machine) {
      console.error(`Invalid Machine Id ${event.machineId()}`);
      return;
    }

    machine.setStockLevel(machine.getStockLevel() + event.refillQuantity());

    console.log(
      `Machine ${machine.getId()} refilled with ${event.refillQuantity()} items. New stock: ${machine.getStockLevel()}\n`
    );
  }
}
