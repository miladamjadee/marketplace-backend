import { OnlineGateway } from '../interface';
import { Zarinpal } from '../online';

export class OnlineGatewayFactory {
  private gateways: Map<string, OnlineGateway> = new Map<
    string,
    OnlineGateway
  >();

  constructor() {
    this.gateways.set('zarinpal', new Zarinpal());
  }
  public createPaymentGateway(gateway: string): OnlineGateway {
    const paymentGateway = this.gateways.has(gateway);
    if (!paymentGateway) {
      throw new Error(`Payment ${gateway} is not supported`);
    }
    return this.gateways.get(gateway);
  }
}
