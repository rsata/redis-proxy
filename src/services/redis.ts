import redis from 'redis';

const client = redis.createClient({
  host: 'redis',
  port: 6379
});

export class RedisClient {
  async get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      client.get(key, (err, result) => {
        if (err) {reject(err)}
        resolve(result);
      })
    });
  }  
  async set(item: any): Promise<any> {
    return new Promise((resolve, reject) => {
      client.set(item.key, item.name, (err, result) => {
        if (err) {reject(err)}
        resolve(result);
      });      
    })
  }
  async quit(): Promise<any> {
    return new Promise((resolve) => {
      client.quit(() => {
          resolve();
      });
    });    
  }
}
