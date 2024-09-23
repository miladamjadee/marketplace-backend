import { OnlineGateway } from '../interface';
import ZarinPalCheckout from 'zarinpal-checkout';

export class Zarinpal implements OnlineGateway {
  public async paymentRequest(amount: number, currency: string) {
    const merchantID = process.env.ZARINPAL_MERCHANT;
    const sandbox = process.env.ZARINPAL_SANDBOX === 'true';
    const appUrl = process.env.APP_URL;
    const zarinpal = ZarinPalCheckout.create(merchantID, sandbox);
    const requestResult = await zarinpal.PaymentRequest({
      Amount: amount,
      CallbackURL: `${appUrl}/payment/verify/zarinpal`,
      Description: 'بابت پرداخت سفارش شماره',
      Email: 'hi@milad.work',
      Mobile: '09120000000',
    });
    if (requestResult && requestResult.status === 100) {
      return {
        success: true,
        url: requestResult.url,
      };
    }
    return {
      success: false,
    };
  }

  public async paymentVerify(amount: number, currency: string) {
    const merchantID = process.env.ZARINPAL_MERCHANT;
    const sandbox = process.env.ZARINPAL_SANDBOX === 'true';
    const zarinpal = ZarinPalCheckout.create(merchantID, sandbox);
    const paymentVerify = await zarinpal.PaymentVerification({
      Amount: amount,
      Authority: '000000000000000000000000000000000000',
    });

    if (paymentVerify && paymentVerify.status === 100) {
      return {
        success: true,
        refID: paymentVerify.RefID,
      };
    }
    return {
      success: false,
    };
  }
}
