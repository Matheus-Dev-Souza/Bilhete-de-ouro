import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
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

const PartnerModel = mongoose.model('Partner', PartnerSchema);

export { PartnerModel };
