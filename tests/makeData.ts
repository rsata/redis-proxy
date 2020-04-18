import { RedisClient } from '../src/services/redis'

const loadData = async () => {
  try {
    const client = new RedisClient();
    
    await client.set({key: 'user_000000001', name: 'Darth Vader'});
    await client.quit();
  }
  catch (err) {
    console.log(err)
  }  
}

loadData();