import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
export enum UserRole {
  ADMIN = 'admin',
  VENDOR = 'vendor',
  SUBSCRIBER = 'subscriber',
  PUBLISHER = 'publisher',
  AUTHOR = 'author',
}
export enum Permissions {
  READ = 'Read',
  WRITE = 'Write',
  DELETE = 'Delete',
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
export class User {
  // @Prop({ auto: true})
  // _id: mongoose.Schema.Types.ObjectId

  @Prop({ type: String, trim: true, required: true, max: 32 })
  firstName: string;

  @Prop({ type: String, trim: true, required: true, max: 32 })
  lastName: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
    required: true,
    max: 32,
    index: true,
    lowercase: true,
  })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: String,
    enum: ['subscriber', 'publisher', 'author', 'vendor', 'admin'],
    default: UserRole.SUBSCRIBER,
  })
  role: string;

  @Prop({
    type: String,
    enum: ['read', 'write', 'delete'],
    default: [Permissions.READ],
  })
  permissions: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
