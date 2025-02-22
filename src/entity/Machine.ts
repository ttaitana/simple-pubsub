export class Machine {
  private stockLevel: number;
  private id: string;

  constructor(id: string, stockLevel: number = 10) {
    this.id = id;
    this.stockLevel = stockLevel;
  }
  
  public getStockLevel(): number{
    return this.stockLevel;
  }

  public setStockLevel(stockLevel: number): void{
    this.stockLevel = stockLevel;
  }

  public getId(): string{
    return this.id;
  }
}
