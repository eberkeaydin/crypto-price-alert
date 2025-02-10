import connectDB from './mongo';
import Redis from 'ioredis';
import Alert from '../src/app/models/Alert';
import { messaging } from './firebase';

const redis = new Redis(process.env.REDIS_URL as string);

export const checkAlerts = async () => {
  console.log("🔍 Checking pending alerts...");
  await connectDB();

  const prices = JSON.parse(await redis.get('cryptoPrices') || '{}');

  if (!prices || Object.keys(prices).length === 0) {
    console.log("⚠️ No prices found in Redis. Skipping alert check.");
    return;
  }

  const pendingAlerts = await Alert.find({ isTriggered: false });

  if (pendingAlerts.length > 0) {
    console.log(`✅ ${pendingAlerts.length} Waiting alerts found`);
  }

  for (const alert of pendingAlerts) {
    const currentPrice = prices[alert.crypto.toLowerCase()]?.usd || 0;

    if (
      (alert.condition === 'greater_than' && currentPrice >= alert.targetPrice) ||
      (alert.condition === 'less_than' && currentPrice <= alert.targetPrice)
    ) {
      console.log(`🚀 Triggering alert for ${alert.crypto} at price $${currentPrice}`);

      try {
        await messaging.send({
          topic: alert.crypto.toLowerCase(),
          notification: {
            title: '📢 Crypto Alert!',
            body: `${alert.crypto} hit your target price: $${currentPrice}`
          }
        });

        await Alert.updateOne({ _id: alert._id }, { isTriggered: true });
        console.log(`✅ Notification sent successfully for ${alert.crypto}`);
      } catch (error) {
        console.error('❌ Firebase Notification Error:', error);
      }
    }
  }
};
