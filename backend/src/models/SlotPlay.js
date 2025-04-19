import mongoose from 'mongoose';

const SlotPlaySchema = new mongoose.Schema({
  externalUserId: { type: String, required: true, index: true },
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true },
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

const SlotPlayModel = mongoose.model('SlotPlay', SlotPlaySchema);

export { SlotPlayModel };
