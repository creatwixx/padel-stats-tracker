Padel Stats Tracker

A full-stack Padel match tracking application built with:

Frontend: React + TypeScript + Vite + MUI + React Query

Backend: NestJS + TypeORM + PostgreSQL

Database GUI: pgAdmin

Deployment: Docker Compose (multi-service setup)

This project lets you track padel matches, store results, and view statistics — all containerized and ready to deploy.

Tech Stack Overview
Layer	Tech	Description
Frontend	React (Vite + TS + MUI)	Modern SPA with responsive UI and React Query hooks for API calls
Backend	NestJS + TypeORM	REST API with database persistence
Database	PostgreSQL	Persistent relational storage
Admin Tool	pgAdmin	Web interface for inspecting database tables
Containerization	Docker + Docker Compose	Unified environment for local dev and production

Prerequisites

Before you begin, ensure you have:

Docker (>= 24.x)

Docker Compose (integrated in Docker Desktop)

Optional: Node 20+ and Yarn/NPM if you want to run parts manually

Project Structure
padel-stats-tracker/
 ├─ backend-padel-stats-tracker/     # NestJS API
 ├─ frontend-padel-stats-tracker/    # React + Vite App
 ├─ db/                              # pgAdmin + init scripts
 │   ├─ servers.json                 # auto-connect pgAdmin config
 ├─ docker-compose.yml               # main Docker orchestration file
 └─ .env                             # shared environment variables

Environment Variables

Create a .env file in the root directory:

# Database configuration
POSTGRES_USER=padel_user
POSTGRES_PASSWORD=padel_pass
POSTGRES_DB=padel_stats

# Backend (NestJS)
DB_HOST=padel_db
DB_PORT=5432
DB_USER=padel_user
DB_PASSWORD=padel_pass
DB_NAME=padel_stats
NODE_ENV=production

# Frontend (Vite)
VITE_API_URL=http://localhost:3000


DB_HOST=padel_db → must match the container name for Postgres (not “localhost”)

VITE_API_URL → base URL used by frontend when calling backend

Docker Setup
Build and Run All Services
docker compose up --build


This command:

builds Docker images for frontend & backend (--build forces fresh build)

starts all containers (db, pgadmin, backend, frontend)

links them together through an internal Docker network

After a minute or two, everything should be up and running.

Check Running Containers
docker ps


You should see something like:

padel_frontend   - 0.0.0.0:5173->5173/tcp
padel_backend    - 0.0.0.0:3000->3000/tcp
padel_pgadmin    - 0.0.0.0:5050->80/tcp
padel_db         - 0.0.0.0:5432->5432/tcp

Access the App
Service	URL	Description
Frontend	http://localhost:5173
	Main React App
Backend API	http://localhost:3000
	NestJS REST endpoints
pgAdmin	http://localhost:5050
	Database UI (admin@padel.com / admin)
PostgreSQL	localhost:5432	Database itself (for external clients)
Dockerfile Highlights
Frontend

frontend-padel-stats-tracker/Dockerfile

# ---- Stage 1: Build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Stage 2: Serve ----
FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]


Two-stage build:

Stage 1 builds the production-ready static files (npm run build)

Stage 2 serves them via a lightweight Node “serve” process

Backend

backend-padel-stats-tracker/Dockerfile

FROM node:20-alpine
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start:prod"]

pgAdmin Auto Configuration

pgAdmin automatically connects to the Postgres container via a mounted config:

db/servers.json

{
  "Servers": {
    "1": {
      "Name": "Padel DB",
      "Group": "Servers",
      "Port": 5432,
      "Username": "padel_user",
      "Host": "padel_db",
      "SSLMode": "prefer",
      "MaintenanceDB": "postgres"
    }
  }
}


This file is mounted in docker-compose.yml:

volumes:
  - ./db/servers.json:/pgadmin4/servers.json


Result: pgAdmin already “knows” your database on startup — no manual setup required.

Reset Database (optional)

If you change environment variables or want a clean DB:

docker compose down -v
docker compose up --build


The -v flag removes all volumes (so the DB is recreated from scratch).

Lint & Build Locally

If you want to verify or test locally (outside Docker):

cd frontend-padel-stats-tracker
yarn install
yarn lint
yarn build


and/or

cd backend-padel-stats-tracker
yarn install
yarn build
yarn start:prod

Common Commands
Command	Description
docker compose up --build -	Build + start all containers
docker compose down	- Stop containers
docker compose down -v - Stop and remove DB volumes (reset database)
docker logs padel_backend -f -	View backend logs
docker logs padel_frontend -f -	View frontend logs
docker exec -it padel_db psql -U padel_user -d padel_stats -	Open psql console inside database

Summary

After running docker compose up --build, you have:

Layer	Running on	Description
Frontend	localhost:5173	React UI built with Vite
Backend	localhost:3000	NestJS REST API
Database	localhost:5432	PostgreSQL
pgAdmin	localhost:5050	DB visualization GUI

Everything runs together in Docker, and can be deployed anywhere with a single command.
