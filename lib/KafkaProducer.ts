import kafka from 'kafka-node';

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const producer = new kafka.Producer(client);

producer.on('ready', () => console.log('Kafka Producer Ready'));

export const publishAlertEvent = (message: any) => {
  const payloads = [{ topic: process.env.KAFKA_TOPIC as string, messages: JSON.stringify(message) }];
  producer.send(payloads, (err, data) => console.log('Alert Sent:', data));
};
