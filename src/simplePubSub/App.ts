import { Machine } from "../entity/Machine";
import { MachineSaleEvent } from "../event/MachineSaleEvent";
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
  // create the PubSub service
  const pubSubService: IPublishSubscribeService = new PublishSubscribeService();
  const machineRepository = new MachineRepository();

  // create 3 machines with a quantity of 10 stock
  const machines: Machine[] = [
    new Machine("001", 3, pubSubService),
    new Machine("002", 3, pubSubService),
    new Machine("003", 3, pubSubService),
  ];

  machineRepository.bulkAddMachine(machines);

  // create a machine sale event subscriber. inject the machines (all subscribers should do this)
  const saleSubscriber = new MachineSaleSubscriber(machineRepository, machines);
  const refillSubscriber = new MachineRefillSubscriber(machineRepository, machines);
  const stockLevelSubscriber = new MachineLowStockWarningSubScriber(machineRepository, machines);

  // Subscribe to events
  pubSubService.subscribe("sale", saleSubscriber);
  pubSubService.subscribe("refill", refillSubscriber);
  pubSubService.subscribe("stockLevel", stockLevelSubscriber);
  
  // create 10 random events
  const events: IEvent[] = EventGeneratorUtil.generateRangeFrom0ToN(5).map((i) => EventGeneratorUtil.eventGenerator(3));
  
  // publish the events  
  events.forEach((event) => pubSubService.publish(event));

  console.info("========== End Event 1 ==========")

  // try add new machine
  const newMachine :Machine = new Machine("004", 3, pubSubService);
  machineRepository.addMachine(newMachine);
  saleSubscriber.addSubscriber(newMachine);
  refillSubscriber.addSubscriber(newMachine);
  stockLevelSubscriber.addSubscriber(newMachine);

  // try remove machine
  const machineToRemove = machineRepository.findMachineById("001");
  if (machineToRemove) {
    saleSubscriber.removeSubscriber(machineToRemove);
  } 
  
  // create 10 random events
  // pubSubService.unsubscribe("refill", refillSubscriber);
  const events2: IEvent[] = EventGeneratorUtil.generateRangeFrom0ToN(5).map((i) => EventGeneratorUtil.eventGenerator(4));
  // publish the events  
  events2.forEach((event) => pubSubService.publish(event));

  //try trigger event on removed machine
  const event: IEvent = new MachineSaleEvent(1, "001");
  pubSubService.publish(event);
})();
