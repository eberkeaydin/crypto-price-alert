import request from 'supertest';
import app from '../../src/app'; // Next.js uygulamasının giriş noktası

describe('API Tests', () => {
  it('POST /api/alert should create a new alert', async () => {
    const res = await request(app)
      .post('/api/alert')
      .send({
        userId: '12345',
        crypto: 'bitcoin',
        condition: 'greater_than',
        targetPrice: 50000,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.crypto).toBe('bitcoin');
  });

  it('GET /api/alert should retrieve alerts for a user', async () => {
    const res = await request(app).get('/api/alert?userId=12345');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});
