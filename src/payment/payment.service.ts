import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from './schemas/payment.schema';
import { Model } from 'mongoose';
import { PaymentMethodFactory } from './factory';
import { OnlinePayment } from './methods/online.payment';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    private readonly paymentMethodFactory: PaymentMethodFactory,
  ) {}

  async processPayment(
    orderId: string,
    userId: string,
    amount: number,
    method: string,
    paymentGateway: string,
  ): Promise<string> {
    const paymentMethod = this.paymentMethodFactory.createPaymentMethod(method);

    if (paymentMethod instanceof OnlinePayment) {
      paymentMethod.setGateway(paymentGateway);
    }

    // اینجا فرایند پرداخت انجام می‌شود
    const success = await paymentMethod.processPayment(amount, 'USD');

    // وضعیت پرداخت را ذخیره می‌کنیم
    const paymentStatus = success ? 'Success' : 'Failed';

    const payment = new this.paymentModel({
      orderId,
      paymentBy: userId,
      amount,
      paymentMethod: method,
      paymentStatus,
      currency: 'iran currency',
      reserve: 'reserve uuid code',
      paymentGateway: method,
    });

    await payment.save();
    return paymentStatus;
  }
}
