import { checkAndTriggerAlert } from '../../src/app/services/AlertService';
import Alert from '../../src/app/models/Alert';
import { messaging } from '../../lib/firebase';

jest.mock('../../src/app/models/Alert', () => ({
  updateOne: jest.fn().mockResolvedValue({})
}));

jest.mock('../../lib/firebase', () => ({
  messaging: {
    send: jest.fn().mockResolvedValue({})
  }
}));

jest.mock('ioredis', () => {
  const Redis = jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue(JSON.stringify({ btc: { usd: 51000 } }))
  }));
  return { __esModule: true, default: Redis };
});

describe('Service - checkAndTriggerAlert', () => {
  test('should trigger alert and send notification', async () => {
    const alert = { 
      _id: '1', 
      userId: '123', 
      crypto: 'BTC', 
      condition: 'greater_than' as const,  
      targetPrice: 50000 
    };
    
    await checkAndTriggerAlert(alert);

    expect(Alert.updateOne).toHaveBeenCalledWith({ _id: '1' }, { isTriggered: true });
    expect(messaging.send).toHaveBeenCalledWith(expect.objectContaining({ topic: 'btc' }));
  });
});
