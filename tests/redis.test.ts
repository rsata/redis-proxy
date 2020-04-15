import { RedisClient } from '../src/services/redis';
const client = new RedisClient()

describe('redis', () => {  
  it('should get data', async () => {
    const r = await client.get('a')
    console.log(r)
    expect(r).toEqual("Luke Skywalker")
    client.quit()
  })
});