import { MachineRefillEvent } from "../event/MachineRefillEvent";
import { MachineSaleEvent } from "../event/MachineSaleEvent";
import { IEvent } from "../interface/IEvent";

export class EventGeneratorUtil {
  private static randomMachine = (totalMachine: number): string => {
    const random = Math.ceil(Math.random() * totalMachine);
    return `00${random}`;
  };

  public static eventGenerator = (totalMachine: number): IEvent => {
    const random = Math.random();
    if (random < 0.5) {
      const saleQty = Math.random() < 0.5 ? 1 : 2; // 1 or 2
      return new MachineSaleEvent(saleQty, this.randomMachine(totalMachine));
    }
    const refillQty = Math.random() < 0.5 ? 3 : 5; // 3 or 5
    return new MachineRefillEvent(refillQty, this.randomMachine(totalMachine));
  };

  public static generateRangeFrom0ToN = (n: number): number[] => {
    return [...Array(n).keys()];
  }
}
