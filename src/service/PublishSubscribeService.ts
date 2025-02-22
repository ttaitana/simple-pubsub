import { IEvent } from "../interface/IEvent";
import { IPublishSubscribeService } from "../interface/IPublishSubscribeService";
import { ISubscriber } from "../interface/ISubScriber";

export class PublishSubscribeService implements IPublishSubscribeService {
  private subscribers: { [eventType: string]: ISubscriber[] } = {};
  private intercrpotorSubscribers: { [eventType: string]: ISubscriber[] } = {};

  public subscribe(type: string, handler: ISubscriber): void {
    if (!this.subscribers[type]) {
      this.subscribers[type] = [];
    }
    this.subscribers[type].push(handler);
  }

  public unsubscribe(type: string, handler: ISubscriber): void {
    if (!this.subscribers[type]) return;
    this.subscribers[type] = this.subscribers[type].filter(
      (subscriber) => subscriber !== handler
    );
  }

  public publish(event: IEvent): void {
    const eventType = event.type();
    if (!this.subscribers[eventType])
      return;
    this.subscribers[eventType].forEach((subscriber) =>
      subscriber.handle(event)
    );
  }
}
