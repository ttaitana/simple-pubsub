import { Machine } from "../entity/Machine";
import { MachineSaleEvent } from "../event/MachineSaleEvent";
import { MachineRepository } from "../repository/MachineRepository";
import { BaseMachineSubscriber } from "./BaseMachineSubscriber";

export class MachineSaleSubscriber extends BaseMachineSubscriber {

  constructor(machines: Machine[]) {
    super(machines);
  }

  handle(event: MachineSaleEvent): void {
    if (!this.isMachineIdValid(event.machineId())) {
      console.error(`Invalid Machine Id ${event.machineId()}`);
      return;
    }

    const machine = MachineRepository.findMachineById(event.machineId());
    if (!machine) {
      console.error(`Invalid Machine Id ${event.machineId()}`);
      return;
    }
    if(event.getSoldQuantity() > machine.getStockLevel()){
      console.error(`Machine Id ${event.machineId()} has slock lower than sold quantity (has ${machine.getStockLevel()}, need ${event.getSoldQuantity()}).`);
      return;
    }
    machine.setStockLevel(machine.getStockLevel() - event.getSoldQuantity());
    
    console.log(
      `Machine ${
        machine.getId()
      } sale with ${event.getSoldQuantity()} items. New stock: ${
        machine.getStockLevel()
      }\n`
    );
  }
}
