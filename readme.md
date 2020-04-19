# Redis Proxy

## High-level architecture overview.
![architecture diagram](./architecture.png)

## What the code does.
This service creates a cache with a single backing Redis instance. Connecting to the cache is done via HTTP.

## Components

### Server
The server uses the Express framework to handle HTTP requests. Upon receiving a request, it checks the cache for the specified key, and if not found, check in Redis. If the item is also not found in Redis, it returns not found to the client.
Clients make requests via the /id/:key route. 
### Cache
The cache uses the `lru-cache` npm package. The max capacity and TTL are configured in the `.env` file and default to 500 items and 1 second. When an item is retrieved from the cache, the update time will reset. For example, if an item is retrieved a second time before expiring, the expiration timer will reset.
### Redis
The Redis backing instance has methods for get, set and quit. On get, it will retrieve a single string value for a key. 

## Algorithmic complexity of the cache operations.
Get: O(n)
Set: O(1)

## Running and testing
To run tests: `make test`
To run a development environment: `make dev`
To build: `make build`

Optionally, update the `.env` file
```
PORT (default: 3000)
REDIS_PORT (default: 6379)
CACHE_EXPIRY (default: 1000)
CACHE_CAPACITY (default: 500)
```

## How long you spent on each part of the project.
* HTTP web service: 1 hour
* Single backing instance: 2 hours
* Cached GET, Global expiry, LRU eviction, Fixed key size: 1 hour
* Configuration: 30 minutes
* System tests: 2 hours
* Platform: 5 hours - took some time getting familiar with Docker, in particular multiple docker containers with the proxy and Redis
* Single-click build and test: 1 hour
* Documentation: 1 hour
* General research, learning new tools, etc. 6 hours

## A list of the requirements that you did not implement and the reasons for omitting them.
* Sequential concurrent processing: handled by node by default