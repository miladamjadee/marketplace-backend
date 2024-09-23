import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema';

export type UserDocument = HydratedDocument<Vendor>;

interface IContactInfo {
  readonly phone: string;
  readonly email: string;
  readonly address: string;
}

@Schema({
  timestamps: true,
  id: true,
  versionKey: false,
  toObject: { virtuals: true },
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id; // rename _id property to id
      delete ret._id; // delete the _id property off the object
      delete ret.__v; // delete useless property
    },
  },
})
export class Vendor {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: User.name,
    required: true,
  })
  user!: Types.ObjectId;

  @Prop({ type: String, trim: true, required: true, max: 32 })
  pageName: string;

  @Prop({ type: String, trim: true, required: true, max: 32 })
  pageCategory: string;

  @Prop({ type: String, required: true })
  pageDescription: string;

  pageStatus: string;

  @Prop(
    raw({
      phone: { type: String },
      email: { type: String, unique: true, lowercase: true, trim: true },
      address: { type: String },
    }),
  )
  contactInfo: Record<string, Required<IContactInfo>>;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
