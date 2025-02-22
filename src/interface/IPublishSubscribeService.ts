import { IEvent } from "./IEvent";
import { ISubscriber } from "./ISubScriber";

export interface IPublishSubscribeService {
  publish(event: IEvent): void;
  subscribe(type: string, handler: ISubscriber): void;
  unsubscribe (type: string, handler: ISubscriber): void;
}
