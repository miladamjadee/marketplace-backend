import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { VendorModule } from './vendor/vendor.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation';
import { CategoryModule } from './category/category.module';
import { WithdrawModule } from './withdraw/withdraw.module';
import { FeatureModule } from './feature/feature.module';
import { CartModule } from './cart/cart.module';
import { SettingModule } from './setting/setting.module';
import { TransactionModule } from './transaction/transaction.module';
import { CommissionModule } from './commission/commission.module';
import { BankModule } from './bank/bank.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate }),
    MongooseModule.forRoot('mongodb://localhost/marketplace'),
    AuthModule,
    PaymentModule,
    VendorModule,
    OrderModule,
    ProductModule,
    UserModule,
    CategoryModule,
    WithdrawModule,
    FeatureModule,
    CartModule,
    SettingModule,
    TransactionModule,
    CommissionModule,
    BankModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
