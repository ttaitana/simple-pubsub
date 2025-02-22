export class MachineStatus {
    private machineId: string;
    private currentStatus: string;
    private isTriggered: boolean;

    constructor(
        machineId: string,
        currentStus: string,
        isTrigger: boolean = false
    ) {
        this.machineId = machineId;
        this.currentStatus = currentStus;
        this.isTriggered = isTrigger;
    }

    public getMachineId(): string {
        return this.machineId;
    }

    public setMachineId(machineId: string): void {
        this.machineId = machineId;
    }

    public getCurrentStatus(): string {
        return this.currentStatus;
    }

    public setCurrentStatus(currentStatus: string): void {
        this.currentStatus = currentStatus;
    }

    public getIsTrigger(): boolean {
        return this.isTriggered;
    }

    public setIsTrigger(isTrigger: boolean): void {
        this.isTriggered = isTrigger;
    }
}
