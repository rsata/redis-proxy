build:
	docker-compose down
	docker-compose build

test:
	docker-compose down
	docker-compose up -d --build
	docker-compose run --rm server npm run data && npm test

dev: 
	docker-compose -f docker-compose.dev.yml up --build

data: 
	docker-compose -f docker-compose.dev.yml up --build
	docker-compose -f docker-compose.dev.yml run server npm run data

redis:
		