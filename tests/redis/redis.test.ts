import Redis from 'ioredis-mock';

describe('Redis Tests', () => {
  const redis = new Redis();

  it('should cache a crypto price', async () => {
    await redis.set('bitcoin', '50000');
    const price = await redis.get('bitcoin');

    expect(price).toBe('50000');
  });
});
