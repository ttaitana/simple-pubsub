import { Machine } from "../entity/Machine";
import { IEvent } from "./IEvent";

export interface ISubscriber {
  handle(event: IEvent): void;
  addSubscriber(machine: Machine): void;
}
