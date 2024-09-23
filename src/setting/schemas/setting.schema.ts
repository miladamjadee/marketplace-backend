import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SettingDocument = HydratedDocument<Setting>;

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
export class Setting {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
