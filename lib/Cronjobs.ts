import cron from 'node-cron';
import { fetchCryptoPrices } from './CryptoFetcher';
import { checkAlerts } from './AlertChecker';

// Get the crypto prices and check alerts simultaneously every minute
cron.schedule('* * * * *', async () => {
  console.log('⏳ Running Crypto Price Fetch and Alert Check Jobs...');
  
  await Promise.all([
    fetchCryptoPrices(),
    checkAlerts()
  ]);

  console.log('✅ Crypto Price Fetch and Alert Check Jobs completed.');
});

console.log("⏳ Cron jobs initialized and scheduled.");
