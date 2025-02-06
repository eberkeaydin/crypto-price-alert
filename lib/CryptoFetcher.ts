import axios from 'axios';
import Redis from 'ioredis';
import 'dotenv/config';

const redis = new Redis(process.env.REDIS_URL as string);

export const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get(`${process.env.CRYPTO_API_URL}/simple/price?ids=bitcoin,ethereum&vs_currencies=usd`);
    await redis.set('cryptoPrices', JSON.stringify(response.data), 'EX', 60);
    console.log('✅ Crypto Prices Updated:', response.data);
  } catch (error) {
    console.error('❌ Error fetching crypto prices:', error);
  }
};
