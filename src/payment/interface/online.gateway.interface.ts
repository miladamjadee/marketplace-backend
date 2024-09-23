export interface OnlineGateway {
  paymentRequest(amount: number, currency: string): any;
  paymentVerify(amount: number, currency: string): any;
}
