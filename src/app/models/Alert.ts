import mongoose from 'mongoose';

const AlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  crypto: { type: String, required: true, trim: true },
  condition: { type: String, enum: ['greater_than', 'less_than'], required: true },
  targetPrice: { type: Number, required: true, min: 0 },
  isTriggered: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// For performance and preventing SQL injection
AlertSchema.index({ userId: 1, crypto: 1 });

export default mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
