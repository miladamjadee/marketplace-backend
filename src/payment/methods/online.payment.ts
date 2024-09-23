import { OnlineGatewayFactory } from '../factory';
import { PaymentStrategy } from '../interface';

export class OnlinePayment implements PaymentStrategy {
  private gateway: string;
  private readonly onlineGatewayFactory = new OnlineGatewayFactory();

  public async processPayment(amount: number, currency: string) {
    const onlineGateway = this.onlineGatewayFactory.createPaymentGateway(
      this.gateway,
    );
    onlineGateway.paymentRequest(amount, currency);
  }
  public setGateway(gateway: string): void {
    this.gateway = gateway;
  }
}
