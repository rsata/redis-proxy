import { server } from '../src/server';
import request from 'supertest';
import { RedisClient } from '../src/services/redis'

const client = new RedisClient()

describe('server', function() {  
  it('returns Darth Vader payload', async () => {
    const res = await request(server)
      .get('/id/user_000000001');    
    expect(res.body).toEqual({key: "user_000000001", value: "Darth Vader"});
  });  

  it('returns 200', async() => {
    const res = await request(server)
      .get('/id/user_000000001')
    expect(res.status).toEqual(200)
  });

  it('returns not found payload', async () => {
    const res = await request(server)
      .get('/id/random_id');
    expect(res.body).toEqual({message: 'Item not found', status: 404});    
  });  

  it('not found returns 404 status', async() => {
    const res = await request(server)
      .get('/id/random_id')
    expect(res.status).toEqual(404)
  });

  it('random endpoint returns 404 status', async() => {
    const res = await request(server)
      .get('/non_existant')
    expect(res.status).toEqual(404)
  });

  it('invalid method returns 404', async() => {
    const res = await request(server)
      .post('/id/user_000000001')
    expect(res.status).toEqual(404)
  });
});

afterAll(async () => {
  await client.quit()
  server.close()
})