.SILENT:
up:
	docker-compose up -d
build:
	docker-compose build
down:
	docker-compose down --rmi local
