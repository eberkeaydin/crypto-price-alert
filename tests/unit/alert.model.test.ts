import mongoose from 'mongoose';
import Alert from '../../src/app/models/Alert';

describe('Model - Alert', () => {
  test('should have required fields', () => {
    const alert = new Alert({
      userId: new mongoose.Types.ObjectId(),
      crypto: 'BTC',
      condition: 'greater_than',
      targetPrice: 50000,
    });

    expect(alert.userId).toBeDefined();
    expect(alert.crypto).toBe('BTC');
    expect(alert.condition).toBe('greater_than');
    expect(alert.targetPrice).toBe(50000);
    expect(alert.isTriggered).toBe(false);
  });
});
