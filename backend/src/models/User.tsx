
// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  internalId: string;
  externalId: string;
  partnerId: Schema.Types.ObjectId;
  balance: number;
  freeSpins: number;
  rtpProfile: 'low' | 'medium' | 'high';
  lastPlay: Date;
}

const UserSchema = new Schema<IUser>({
  internalId: { type: String, required: true, unique: true },
  externalId: { type: String, required: true },
  partnerId: { type: Schema.Types.ObjectId, ref: 'Partner', required: true },
  balance: { type: Number, default: 0 },
  freeSpins: { type: Number, default: 0 },
  rtpProfile: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  lastPlay: Date
}, { timestamps: true });

export const UserModel = mongoose.model<IUser>('User', UserSchema);