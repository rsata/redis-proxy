import { RedisClient } from '../src/services/redis';
const client = new RedisClient();

describe('redis', () => {  
  it('get user', async () => {
    const res = await client.get('user_000000001');
    expect(res).toEqual("Darth Vader")
  });

  it('set user', async () => {
    const user = {key: 'user_000000002', name: 'Luke Skywalker'};
    const res = await client.set(user);
    expect(res).toEqual("OK");
  });

  it('not found in redis', async () => {
    const res = await client.get('random_id');
    expect(res).toEqual(null)
  });
});

afterAll(async () => {
  await client.quit();
})
