import { MachineStockLevelEvent } from "../event/MachineStockLevelEvent";
import { IPublishSubscribeService } from "../interface/IPublishSubscribeService";

export class Machine {
    private stockLevel: number;
    private id: string;
    private pubSubService: IPublishSubscribeService;

    constructor(id: string, stockLevel: number = 10, pubSubService: IPublishSubscribeService) {
        this.id = id;
        this.stockLevel = stockLevel;
        this.pubSubService = pubSubService;
    }

    public getStockLevel(): number {
        return this.stockLevel;
    }

    public setStockLevel(stockLevel: number): void {
        this.stockLevel = stockLevel;
        this.pubSubService.publish(new MachineStockLevelEvent(this.getId()));
    }

    public getId(): string {
        return this.id;
    }
}
