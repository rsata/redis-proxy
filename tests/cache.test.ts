import { Cache } from '../src/services/cache';

const cache = new Cache()

describe('cache', () => {
  it('set cache', async () => {
    const set = await cache.set('user_000000002', 'Luke Skywalker');
    expect(set).toEqual(true);
  });

  it('get from cache', async () => {
    const item = await cache.get('user_000000001')
    expect(item).toEqual('Darth Vader')
  });

  it('not found in cache', async () => {
    const item = await cache.get('random_key')
    expect(item).toEqual(undefined)
  });
});

beforeAll(async () => {
  await cache.set('user_000000001', 'Darth Vader');
})