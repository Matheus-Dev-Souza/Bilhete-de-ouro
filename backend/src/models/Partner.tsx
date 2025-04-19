// src/models/Partner.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  apiKey: string;
  webhookUrl?: string;
  iframeConfig: {
    allowedFeatures: string[];
    customCSS?: string;
    maxBet?: number;
  };
  financials: {
    balance: number;
    totalGGR: number;
  };
}

const PartnerSchema = new Schema<IPartner>({
  name: { type: String, required: true, index: true },
  apiKey: { type: String, required: true, unique: true },
  webhookUrl: String,
  iframeConfig: {
    allowedFeatures: { type: [String], default: ['spin', 'balance'] },
    customCSS: String,
    maxBet: Number
  },
  financials: {
    balance: { type: Number, default: 0 },
    totalGGR: { type: Number, default: 0 }
  }
}, { timestamps: true });

export const PartnerModel = mongoose.model<IPartner>('Partner', PartnerSchema);

