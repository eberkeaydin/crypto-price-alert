import connectDB from '../../lib/mongo';
import Alert from '../../src/app/models/Alert';
export default async function handler(req, res) {
    await connectDB();
    if (req.method === 'POST') {
        const { userId, crypto, condition, targetPrice } = req.body;
        console.log("Request sending..");
        try {
            const newAlert = await Alert.create({ userId, crypto, condition, targetPrice });
            res.status(201).json(newAlert);
        }
        catch (error) {
            console.log("Error while creating new alert: ", error);
            res.status(500).json({ error: 'Database error' });
        }
    }
    else if (req.method === 'GET') {
        try {
            const alerts = await Alert.find({ userId: req.query.userId });
            res.status(200).json(alerts);
        }
        catch (error) {
            console.log("Error: ", error);
            res.status(500).json({ error: 'Database error' });
        }
    }
    else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
