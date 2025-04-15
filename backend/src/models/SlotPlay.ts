import mongoose, { Schema, Document } from 'mongoose';

interface SlotPlay extends Document {
  userId: string;
  betAmount: number;
  winAmount: number;
  RTP: number;
  GGR: number;
  timestamp: Date;
}

const slotPlaySchema: Schema = new Schema({
  userId: { type: String, required: true },
  betAmount: { type: Number, required: true },
  winAmount: { type: Number, required: true },
  RTP: { type: Number, required: true },
  GGR: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const SlotPlayModel = mongoose.model<SlotPlay>('SlotPlay', slotPlaySchema);
