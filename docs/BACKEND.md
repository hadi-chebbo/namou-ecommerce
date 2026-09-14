# Backend Documentation

## Overview

The backend is built using Node.js, TypeScript and Express and it is responsible for the buisness logic of the application. It provides the APIs used by the frontend for authentication,
 products, variants, cart, wishlist and orders

Since I chose PostgreSql for storing the application data , I have decided to go with Sequelize for the database models, relationships ( stored in a shared db package used by all components of the application) and migrations. I also added request validation (Didnt trust frontend for validation everything was revalidated on the backend side), authentication, authorization and centralized error handling to keep the API more consistent and secure

The backend is organized by modules, where each feature has its own routes, controllers, services and validation schemas. This way the code was kept organized and it was easier to maintain or to extend while adding feature and working on the assignment

## Technology choices

### 1. Node.js + TypeScript

I chose Node.js with TypeScript because it works well with React/TypeScript on the frontend side and it allows me to catch type related issues early and make the code easier to maintain

### 2. Express

I used Express for the HTTP framework. It is simple , flexible and it gives me control over my API organization without adding to much abstraction

### 3. Sequelize

I used Sequelize as the ORM to work with PostgreSQL , it allows the models and relationships to be defined in the application and also provides migrations and seeders for managing the databse and in addition it prevents me from writing raw sql myself which reduces the risk of security vulnerabilities such as SQL injection and it is easier to understand and maintain

### 4. Zod

Zod is used to validate incoming requests. I wanted validation to happen before reaching the controllers so that the controllers only focus on receiving and responding to the API requests

### 5. JWT + HttpOnly cookies

Authentication uses JWT access tokens stored in an HttpOnly cookie. This allows frontend to authenticate requests without having direct access to the token through javascript which prevents security vulnerabilities such as token theft through XSS

### 6. bcrypt

Passwords are hashed using bcrypt instead of storing them directly in the database.

### 7. REST API

The backend exposes a REST API for communication with the frontend. The endpoints are organized around the main resources of the application such as authentication, products, cart, order and wishlist.

## Project Structure

The backend is organized by responsibility and feature. Shared backend infrastructure is kept separate from the application modules.

```text
src/
├── config/
├── middlewares/
└── modules/
    ├── auth/
    ├── products/
    ├── cart/
    ├── wishlist/
    └── orders/
```

The `config` folder contains things like the database and environment configuration.

The `middlewares` folder contains reusable request logic such as authentication, authorization, validation and error handling.

The `modules` folder is organized by feature. Each module contains the code related to that feature, instead of having all controllers, services and routes in separate global folders.

For example, a module can have:

```text
products/
├── product.controller.ts
├── product.service.ts
├── product.route.ts
└── product.schema.ts
```

The request flow is mainly:

```text
Route → Validation → Controller → Service → Database
```

The routes define the endpoints and apply the required middleware. The controller handles the HTTP request and response, while the service contains the main business logic. This keeps the controllers smaller and makes the business logic easier to reuse and maintain.

## Security and Error Handling

Security was considered as part of the backend design rather than as a separate feature.

Passwords are hashed using bcrypt and are never stored directly in the database. Authentication uses JWT access tokens stored in HttpOnly cookies, which prevents the token from being accessed directly through client-side JavaScript.

Protected routes use authentication middleware, while authorization middleware is used when a specific role is required. Incoming request data is also validated using Zod before reaching the application logic.

The backend also has centralized error handling. Application errors are handled through a common error middleware so that the API can return consistent responses without exposing unnecessary internal details.

I added rate limiting to help prevent excessive requests and basic abuse of the API.
Login has a stricter limit to help prevent brute-force attempts.
Public endpoints such as products have a more relaxed limit since they are accessed during normal browsing.
The limits are handled using express-rate-limit and applied at the route level.

Order creation uses a database transaction because it involves multiple related changes. It also locks the relevant product/variant rows while checking and updating stock, preventing two users from purchasing the same remaining quantity at the same time. If any step fails, the transaction rolls everything back.