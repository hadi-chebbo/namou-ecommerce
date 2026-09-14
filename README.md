# MAVE — Mini E-Commerce Platform

A full-stack mini e-commerce platform built with React, Node.js, Express and PostgreSQL.

## Tech Stack

- React + TypeScript
- Node.js + Express + TypeScript
- PostgreSQL + Sequelize
- Docker + Docker Compose
- TanStack Query
- Tailwind CSS

## Running the Project

The project runs with 3 Docker containers:

```text
Web - API - PostgreSQL
```

### 1. Clone the repository

```bash
git clone https://github.com/hadi-chebbo/namou-ecommerce.git
cd namou-ecommerce
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
JWT_SECRET=your-jwt-secret
```

### 3. Start the application

```bash
docker compose up --build
```

### 4. Run database migrations

```bash
docker compose exec api npx sequelize-cli db:migrate
```

### 5. Seed the database

```bash
docker compose exec api npx sequelize-cli db:seed:all
```

The migrations create the database tables and the seeders populate the database with the required products and test user.

## Test Account

```text
Email: test@namou.ae
Password: namOU1234_;test
```

Use these credentials to log into the application.

## URLs

```text
Frontend: localhost:5173
API:      localhost:3000
```

## Documentation

- `docs/backend.md`
- `docs/frontend.md`
- `docs/database.md`
- `AI_USAGE.md`