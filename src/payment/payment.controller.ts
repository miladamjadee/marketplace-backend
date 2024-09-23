import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async makePayment(
    @Body()
    body: {
      orderId: string;
      userId: string;
      amount: number;
      method: string;
      paymentGateway: string;
    },
  ) {
    const status = await this.paymentService.processPayment(
      body.orderId,
      body.userId,
      body.amount,
      body.method,
      body.paymentGateway,
    );
    return { message: `Payment ${status}` };
  }
}
