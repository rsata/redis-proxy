/*
Automated systems tests confirm that the end-to-end system functions as specified. 
These tests should treat the proxy as a black box to which an HTTP client connects and makes requests. 
The proxy itself should connect to a running Redis instance. 
The test should test the Redis proxy in its running state (i.e. by starting the artifact that would be started in production). 
It is also expected for the test to interact directly with the backing Redis instance in order to get it into a known good state (e.g. to set keys that would be read back through the proxy).
*/

import { server } from '../src/server';
import request from 'supertest';
import { RedisClient } from '../src/services/redis'

const client = new RedisClient()

describe('server', function() {  
  it('returns Darth Vader', async () => {
    const res = await request(server)
      .get('/id/user_000000001');    
    expect(res.body).toEqual({key: "user_000000001", value: "Darth Vader"});
  });  

  it('returns not found', async () => {
    const res = await request(server)
      .get('/id/random_id');
    expect(res.body).toEqual({message: 'Item not found', status: 404});    
  });  
});

afterAll(async () => {
  await client.quit()
  server.close()
})