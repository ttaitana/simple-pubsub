import { Machine } from "../entity/Machine";
import { MachineStatus } from "../entity/MachineStatus";
import { MachineStockLevelEvent } from "../event/MachineStockLevelEvent";
import { ISubscriber } from "../interface/ISubScriber";
import { MachineRepository } from "../repository/MachineRepository";

export class MachineLowStockWarningSubScriber implements ISubscriber {
  private STOCK_OK: string = "STOCK_LEVEL_OK";
  private STOCK_LOW: string = "LOW_STOCK_LEVEL";
  private STOCK_THRESHOLD: number = 3;

  private mahcineStatus: MachineStatus[];
  protected machineRepository: MachineRepository;

  constructor(machineRepository: MachineRepository, machines: Machine[]) {
    this.machineRepository = machineRepository;
    this.mahcineStatus = machines.map((m) => {
      return new MachineStatus(
        m.getId(),
        m.getStockLevel() >= this.STOCK_THRESHOLD
          ? this.STOCK_OK
          : this.STOCK_LOW,
        false
      );
    });
  }

  public addSubscriber(machine: Machine): void {
    if (this.findmachineId(machine.getId())) {
      console.error(`Machine Id ${machine.getId()} already subscribe.`);
      return;
    }
    this.mahcineStatus.push(
      new MachineStatus(
        machine.getId(),
        machine.getStockLevel() >= this.STOCK_THRESHOLD
          ? this.STOCK_OK
          : this.STOCK_LOW,
        false
      )
    );
  }

  public removeSubscriber(machine: Machine): void {
    const index = this.mahcineStatus.findIndex((m) => m.getMachineId() === machine.getId());
    if (index === -1) {
      console.error(`Machine Id ${machine.getId()} not found.`);
      return;
    }
    this.mahcineStatus.splice(index, 1);
  }

  private getMachineStatus(machineId: string): MachineStatus | undefined {
    const existMachineId = this.findmachineId(machineId);
    if (!existMachineId) {
      return undefined;
    }
    return existMachineId;
  }

  private findmachineId(machineId: String) {
    return this.mahcineStatus.find((m) => m.getMachineId() === machineId);
  }

  handle(event: MachineStockLevelEvent): void {
    const machineStatus: MachineStatus | undefined = this.getMachineStatus(
      event.machineId()
    );
    if (!machineStatus) {
      console.error(`Machine Id ${event.machineId()} not subscribe to stock level event.`);
      return;
    }

    const machine = this.machineRepository.findMachineById(event.machineId());
    if (!machine) {
      console.error(`Invalid Machine Id ${event.machineId()}`);
      return;
    }

    const currentStock = machine.getStockLevel();

    if (currentStock >= this.STOCK_THRESHOLD) {
        if(machineStatus.getCurrentStatus() !== this.STOCK_OK || !machineStatus){
            console.warn(`Machine Id ${event.machineId()} stock level is OK`);
            machineStatus.setCurrentStatus(this.STOCK_OK);
            machineStatus.setIsTrigger(true);
        }
    }else{
        if(machineStatus.getCurrentStatus() !== this.STOCK_LOW || !machineStatus){
            console.warn(`Machine Id ${event.machineId()} stock level is LOW`);
            machineStatus.setCurrentStatus(this.STOCK_LOW);
            machineStatus.setIsTrigger(true);
        }
    }
  }
}
