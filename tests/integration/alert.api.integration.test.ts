import mongoose from 'mongoose';
import request from 'supertest';
import { createServer } from 'http';
import handler from '../../pages/api/alert';
import { NextApiRequest, NextApiResponse } from 'next';

let server;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  server = createServer((req, res) => handler(req as NextApiRequest, res as NextApiResponse));
  server.listen(3001);
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe('Integration - Alert API', () => {
  test('POST /api/alert - should create and retrieve an alert', async () => {
    await request('http://localhost:3001').post('/api/alert').send({ userId: '123', crypto: 'BTC', condition: 'greater_than', targetPrice: 50000 });
    const response = await request('http://localhost:3001').get('/api/alert?userId=123');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
