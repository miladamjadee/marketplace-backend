import { PaymentStrategy } from '../interface';
import { OnlinePayment } from '../methods/online.payment';

export class PaymentMethodFactory {
  private methods: Map<string, PaymentStrategy> = new Map<
    string,
    PaymentStrategy
  >();

  constructor() {
    this.methods.set('online', new OnlinePayment());
  }
  public createPaymentMethod(method: string): PaymentStrategy {
    const paymentMethod = this.methods.has(method);
    if (!paymentMethod) {
      throw new Error(`Payment method ${method} is not supported`);
    }
    return this.methods.get(method);
  }
}
