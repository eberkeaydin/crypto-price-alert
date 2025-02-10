import kafka from 'kafka-node';

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new kafka.Producer(client);

producer.on('ready', () => console.log('Kafka Producer is ready'));

export const publishAlertEvent = (alert: unknown) => {
  const payloads = [{ topic: process.env.KAFKA_TOPIC as string, messages: JSON.stringify(alert) }];
  
  producer.send(payloads, (err, data) => {
    if (err) {
      console.error('Kafka Error:', err);
    } else {
      console.log('Alert Published:', data);
    }
  });
};
