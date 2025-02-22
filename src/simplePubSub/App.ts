import { Machine } from "../entity/Machine";
import { IEvent } from "../interface/IEvent";
import { IPublishSubscribeService } from "../interface/IPublishSubscribeService";
import { MachineRepository } from "../repository/MachineRepository";
import { PublishSubscribeService } from "../service/PublishSubscribeService";
import { MachineRefillSubscriber } from "../subscriber/MachineRefillSubscriber";
import { MachineSaleSubscriber } from "../subscriber/MachineSaleSubscriber";
import { MachineLowStockWarningSubScriber } from "../subscriber/MachineStockLevelScriber";
import { EventGeneratorUtil } from "../util/EventGeneratorUtil";

// program
(async () => {
  //create vertual database for machine

  // create 3 machines with a quantity of 10 stock
  const machines: Machine[] = [
    new Machine("001", 10),
    new Machine("002", 10),
    new Machine("003", 10),
  ];

  MachineRepository.bulkAddMachine(machines);

  // create a machine sale event subscriber. inject the machines (all subscribers should do this)
  const saleSubscriber = new MachineSaleSubscriber(machines);
  const refillSubscriber = new MachineRefillSubscriber(machines);
  const stockLevelSubscriber = new MachineLowStockWarningSubScriber(machines);

  // create the PubSub service
  const pubSubService: IPublishSubscribeService = new PublishSubscribeService();

  // Subscribe to events
  pubSubService.subscribe("sale", saleSubscriber);
  pubSubService.subscribe("refill", refillSubscriber);
  pubSubService.subscribe("stockLevel", stockLevelSubscriber);
  //todo: make stockLevel trigger everytime
  
  // create 5 random events
  const events: IEvent[] = [1, 2, 3, 4, 5].map((i) => EventGeneratorUtil.eventGenerator());
  
  // publish the events  
  events.forEach((event) => pubSubService.publish(event));

  console.info("========== End Event 1 ==========")

  // // add new machine
  // const newMachine :Machine = new Machine("004", 10);
  // MachineRepository.addMachine(newMachine);
  // saleSubscriber.addSubscriber(newMachine);
  // pubSubService.subscribe("sale", saleSubscriber);
  
  // create 5 random events
  pubSubService.unsubscribe("refill", refillSubscriber);
  const events2: IEvent[] = [1, 2, 3, 4, 5].map((i) => EventGeneratorUtil.eventGenerator());
  // publish the events  
  events2.forEach((event) => pubSubService.publish(event));
})();
