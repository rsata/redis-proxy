import { RedisClient } from '../src/services/redis';
const client = new RedisClient();

describe('redis', () => {  
  it('should get Darth Vader', async () => {
    const r = await client.get('user_000000001');
    expect(r).toEqual("Darth Vader")
  });

  it('should get Darth Vader', async () => {
    const r = await client.get('user_000000001');
    expect(r).toEqual("Darth Vader")    
  });
});

afterAll(async () => {
  await client.quit();
})
