export interface PaymentStrategy {
  processPayment(amount: number, currency: string): Promise<any>;
  setGateway(gateway: string): void;
}
