// src/models/SlotPlay.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ISlotPlay extends Document {
  externalUserId: string;
  partnerId: Schema.Types.ObjectId;
  betAmount: number;
  winAmount: number;
  rtp: number;
  ggr: number;
  symbols: string[][];
  meta: {
    isFreeSpin: boolean;
    bonusTriggered?: string;
  };
}

const SlotPlaySchema = new Schema<ISlotPlay>({
  externalUserId: { type: String, required: true, index: true },
  partnerId: { type: Schema.Types.ObjectId, ref: 'Partner', required: true },
  betAmount: { type: Number, required: true },
  winAmount: { type: Number, required: true },
  rtp: { type: Number, required: true },
  ggr: { type: Number, required: true },
  symbols: { type: [[String]], required: true },
  meta: {
    isFreeSpin: { type: Boolean, default: false },
    bonusTriggered: String
  }
}, { timestamps: true });

export const SlotPlayModel = mongoose.model<ISlotPlay>('SlotPlay', SlotPlaySchema);
