import cron from 'node-cron';
import { fetchCryptoPrices } from './CryptoFetcher';
import { checkAlerts } from './AlertChecker';

// Get the crypto prices and write to Redis
cron.schedule('* * * * *', async () => {
  console.log('⏳ Running Crypto Price Fetch Job...');
  await fetchCryptoPrices();
});

// Check the waiting alarms in every minute
cron.schedule('* * * * *', async () => {
  console.log('🔔 Running Alert Check Job...');
  await checkAlerts();
});

console.log("⏳ Cron jobs initialized and scheduled.");
