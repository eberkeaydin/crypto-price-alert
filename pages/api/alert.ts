import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../lib/mongo';
import Alert from '../../src/app/models/Alert';
import { publishAlertEvent } from '../../lib/KafkaProducer';
import { authenticateToken } from '../../lib/authMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  // Kimlik doğrulama
  authenticateToken(req, res, async () => {
    if (req.method === 'POST') {
      const { crypto, condition, targetPrice } = req.body;

      try {
        const newAlert = await Alert.create({
          userId: req.user.id, // Token'dan alınan userId
          crypto,
          condition,
          targetPrice
        });

        publishAlertEvent(newAlert);
        res.status(201).json(newAlert);
      } catch (error) {
        console.error("Error while creating alert:", error);
        res.status(500).json({ error: 'Database error' });
      }
    } 
    
    else if (req.method === 'GET') {
      try {
        const alerts = await Alert.find({ userId: req.user.id }); // Token'dan alınan userId ile filtreleme
        res.status(200).json(alerts);
      } catch (error) {
        console.error("Error while fetching alerts:", error);
        res.status(500).json({ error: 'Database error' });
      }
    } 
    
    else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  });
}
