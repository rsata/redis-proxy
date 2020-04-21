import LRU from '../src/services/lruCache';

const cache = new LRU(1000, 2);

describe('cache', () => {
  it('set cache', () => {
    const set = cache.set('user_000000002', 'Luke Skywalker');
    expect(set).toEqual(undefined);
  });

  it('get from cache', () => {
    const item = cache.get('user_000000001')
    expect(item).toEqual('Darth Vader')
  });

  it('not found in cache', () => {
    const item = cache.get('random_key')
    expect(item).toEqual(undefined)
  });

  it('expired from cache', async () => {    
    cache.set('user_000000003', 'Yoda');
    const wait = new Promise(resolve => setTimeout(resolve, 3000));
    await wait.then(()=>{
      const item = cache.get('user_000000003');
      expect(item).toEqual(undefined);
    }); 
  });  

  it('max capacity hit in cache', () => {
    cache.set('user_000000004', 'C3PIO');
    cache.set('user_000000005', 'R2D2');
    cache.set('user_000000006', 'BB8');
    const item = cache.get('user_000000004')
    expect(item).toEqual(undefined)
  });
});

beforeAll(() => {
  cache.set('user_000000001', 'Darth Vader');
})