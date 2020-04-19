import LRU from 'lru-cache';

const settings = {
  max: parseInt(<string>process.env.CACHE_CAPACITY) || 500,
  maxAge: parseInt(<string>process.env.CACHE_EXPIRY) || 10000,
  updateAgeOnGet: true
}

const cache = new LRU(settings);


export class Cache {
  async get(key: string): Promise<any> {    
    return new Promise((resolve, reject) => {
      let user = cache.get(key);
      resolve(user);
    })
  }
  async set(key:string, value: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const set = cache.set(key, value);
      resolve(set);
    })    
  }
  async delete(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cache.del(key)
      resolve(`deleted ${key}`)
    })
  }
};
