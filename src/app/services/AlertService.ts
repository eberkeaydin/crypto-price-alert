import Redis from 'ioredis';
import Alert from '../models/Alert';
import { messaging } from '../../../lib/firebase';

const redis = new Redis(process.env.REDIS_URL as string);

export const checkAndTriggerAlert = async (alertData: any) => {
  const prices = JSON.parse(await redis.get('cryptoPrices') || '{}');
  const currentPrice = prices[alertData.crypto.toLowerCase()]?.usd || 0;

  if (
    (alertData.condition === 'greater_than' && currentPrice >= alertData.targetPrice) ||
    (alertData.condition === 'less_than' && currentPrice <= alertData.targetPrice)
  ) {
    console.log(`🚀 Triggering alert for ${alertData.crypto} at price $${currentPrice}`);

    try {
      await messaging.send({
        topic: alertData.crypto.toLowerCase(),
        notification: {
          title: '📢 Crypto Alert!',
          body: `${alertData.crypto} hit your target price: $${currentPrice}`
        }
      });

      await Alert.updateOne({ _id: alertData._id }, { isTriggered: true });
      console.log(`✅ Notification sent successfully for ${alertData.crypto}`);
    } catch (error) {
      console.error('❌ Firebase Notification Error:', error);
    }
  }
};
