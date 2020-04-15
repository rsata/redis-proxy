import LRU from 'lru-cache';
import { RedisClient} from './redis';
import { resolve } from 'dns';

const cache = new LRU({
  max: 500,
  maxAge: 10000,
  updateAgeOnGet: true
});


export class Cache {
  async get(key: string): Promise<any> {    
    return new Promise((resolve, reject) => {
      let user = cache.get(key);
      resolve(user);
    })
  }
  async set(key:string, record: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const set = cache.set(key, record);
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
