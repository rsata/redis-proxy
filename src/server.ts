import express from 'express';
import bodyParser from 'body-parser';
import { Cache} from './services/cache';
import { RedisClient } from './services/redis';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 3000;
const cache = new Cache();
const client = new RedisClient();

const server = app.listen(port, () => console.log(`Running on ${port}.`));

app.get('/id/:key', async (req, res) => {
  try {
    const key: string = req.params.key;
    
    // Get from cache
    let item = await cache.get(key);

    // if found in cache, send it
    if (item!==undefined) {      
      res.status(200).send({key, value: item});
      return;
    }

    // If not in cache, get from redis         
    item = await client.get(key);    

    // If found in redis, send it and update cache
    if (item!==null) {      
      res.status(200).send({key, value: item});
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

export {server};