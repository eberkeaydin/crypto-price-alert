import { KafkaProducer } from '../../lib/KafkaProducer';

describe('Kafka Tests', () => {
  it('should send a message to Kafka', async () => {
    const producer = new KafkaProducer();
    const message = { crypto: 'bitcoin', price: 50000 };

    const result = await producer.sendMessage('crypto-alerts', message);
    expect(result).toBe(true);
  });
});
