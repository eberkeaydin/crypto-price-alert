import * as dotenv from 'dotenv';
import kafka from 'kafka-node';
import connectDB from './mongo';
import { checkAndTriggerAlert } from '../src/app/services/AlertService';

dotenv.config();

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });

const consumer = new kafka.Consumer(
  client,
  [{ topic: process.env.KAFKA_TOPIC as string, partition: 0 }],
  {}
);

consumer.on('message', async (message) => {
  console.log('✅ Received Alert Event:', message);
  await connectDB();

  const alertData = JSON.parse(message.value as string);

  // Check operations when a new alarm triggered
  await checkAndTriggerAlert(alertData);
});

consumer.on('error', (err) => {
  console.error('❌ Kafka Consumer Error:', err);
});

console.log("📡 Kafka Consumer is running and listening for events...");
