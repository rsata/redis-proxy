import express from 'express';
import cluster from 'cluster';
import { Cache} from './cache';
import { RedisClient } from './redis';
// import { Record } from '../lib/types';
import { ClientRequest } from 'http';

const app = express()
const port = process.env.PORT || 3000;
const cache = new Cache();
const client = new RedisClient();

export default class Server  {
  run() {
    app.listen(port, () => console.log(`Running on ${port}.`))
  
    app.get('/id/:key', async (req, res) => {
      try {
        const key: string = req.params.key;
        
        // Get from cache
        let item = await cache.get(key);
    
        // if found in cache, send it
        if (item!==undefined) {      
          res.status(200).send({item});
          return;
        }
    
        // If not in cache, get from redis         
        item = await client.get(key);    
    
        // If found in redis, send it and update cache
        if (item!==null) {      
          res.status(200).send({item});
          await cache.set(key, item)
          return;
        }
    
        // If not found in redis, send not found    
        res.status(404).send({message: 'Item not found', status: 404});    
      }
      catch (err) {
        console.log(err);
        res.status(501).send(err);
      }
    });
  }
  async load(item: any) {
    await client.set(item);
    await client.quit();
    return;
  }
}
