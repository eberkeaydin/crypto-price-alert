import kafka from 'kafka-node';
import admin from 'firebase-admin';
import Alert from '../src/app/models/Alert';
import connectDB from './mongo';
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS)),
    });
}
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });
const consumer = new kafka.Consumer(client, [{ topic: process.env.KAFKA_TOPIC, partition: 0 }]);
consumer.on('message', async (message) => {
    await connectDB();
    const alertData = JSON.parse(message.value);
    console.log('Processing Alert:', alertData);
    await admin.messaging().send({
        token: alertData.userToken,
        notification: { title: 'Crypto Alert!', body: `Your ${alertData.crypto} alert was triggered.` },
    });
    await Alert.updateOne({ _id: alertData._id }, { isTriggered: true });
});
