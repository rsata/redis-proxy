import Server from '../src/services/server'

const loadData = async () => {
  try {
    const server = new Server();
    
    await server.load({key: 'a', name: 'Luke Skywalker'});
  }
  catch (err) {
    console.log(err)
  }  
}

loadData();