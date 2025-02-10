import request from 'supertest';
import { createServer } from 'http';
import handler from '../../pages/api/alert';
import { NextApiRequest, NextApiResponse } from 'next';

jest.mock('../../src/app/models/Alert', () => ({
  create: jest.fn().mockResolvedValue({ userId: '123', crypto: 'BTC', condition: 'greater_than', targetPrice: 50000 }),
  find: jest.fn().mockResolvedValue([{ userId: '123', crypto: 'BTC', condition: 'greater_than', targetPrice: 50000 }]),
  updateOne: jest.fn().mockResolvedValue({})
}));

jest.mock('../../lib/KafkaProducer', () => ({
  publishAlertEvent: jest.fn()
}));

describe('API - Alert Endpoints', () => {
  let server: ReturnType<typeof createServer> | null = null;
  beforeAll(() => {
    server = createServer((req, res) => handler(req as NextApiRequest, res as NextApiResponse));
    server.listen(3001);
  });
  afterAll(() => {
    if (server) server.close();
  });

  test('POST /api/alert - should create a new alert', async () => {
    const response = await request('http://localhost:3001').post('/api/alert').send({ userId: '123', crypto: 'BTC', condition: 'greater_than', targetPrice: 50000 });
    expect(response.status).toBe(201);
    expect(response.body.userId).toBe('123');
  });
});