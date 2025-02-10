import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// NextApiRequest türüne 'user' özelliğini eklemek için Interface Declaration Merging
declare module 'next' {
  interface NextApiRequest {
    user?: any; // Kullanıcıyı buraya ekliyoruz (JWT payload türüne göre güncelleyebilirsin)
  }
}

export function authenticateToken(req: NextApiRequest, res: NextApiResponse, next: Function) {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token al

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded; // Kullanıcıyı request nesnesine ekle
    next();
  } catch (error) {
    console.error("Error: ", error);
    return res.status(403).json({ error: 'Invalid token' });
  }
}
