import { Machine } from "../entity/Machine";

export class MachineRepository {
  private static machines: Machine[] = new Array<Machine>();

  public static findMachineById(id?: string): Machine | undefined {
    return this.machines.find((m: Machine) => m.getId() === id);
  }

  public static addMachine(machine: Machine): boolean {
    if (!this.findMachineById(machine.getId())) {
      this.machines.push(machine);
      return true;
    }
    return false;
  }

  public static bulkAddMachine(machines: Machine[]): boolean {
    let result: boolean = true;
    for (const machine of machines) {
      if (!this.addMachine(machine)) {
        result = false;
        console.error(`Unable to add machine id ${machine.getId()}`);
      }
    }
    return result;
  }
}
