import mongoose from 'mongoose';
const AlertSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    crypto: { type: String, required: true },
    condition: { type: String, enum: ['greater_than', 'less_than'], required: true },
    targetPrice: { type: Number, required: true },
    isTriggered: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Alert || mongoose.model('Alert', AlertSchema);
