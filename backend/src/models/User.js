import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  internalId: { type: String, required: true, unique: true },
  externalId: { type: String, required: true },
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true },
  balance: { type: Number, default: 0 },
  freeSpins: { type: Number, default: 0 },
  rtpProfile: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  lastPlay: Date
}, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);

export { UserModel };
