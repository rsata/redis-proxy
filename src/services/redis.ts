import redis from 'redis';

const settings = {
  host: 'redis',
  port: parseInt(<string>process.env.REDIS_PORT) || 6379,
}

const client = redis.createClient(settings);

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
