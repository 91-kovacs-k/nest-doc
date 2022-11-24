import { FakeAuthMiddleware } from './fake-auth.middleware';

describe('FakeAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new FakeAuthMiddleware()).toBeDefined();
  });
});
