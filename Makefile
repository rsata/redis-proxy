build:
	docker-compose down
	docker-compose build

test:
	docker-compose down
	docker-compose -f docker-compose.test.yml up -d --build
	docker-compose -f docker-compose.test.yml run server npm run data
	docker-compose -f docker-compose.test.yml run server npm test

dev: 
	docker-compose -f docker-compose.dev.yml up --build

data: 
	docker-compose -f docker-compose.dev.yml up --build
	docker-compose -f docker-compose.dev.yml run server npm run data

redis:
		