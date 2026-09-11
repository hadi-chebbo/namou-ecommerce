# Database Documentation

## 1. Database Choice

### Why PostgreSQL?

I chose PostgreSQL because the application has a lot of relational data with clear relationships between the entities of the system.

It also provides useful features for this project such as:

- Foreign keys and constraints for data integrity
- Transactions for checkout operations
- UUID primary keys
- JSONB for flexible variant options
- Decimal types for prices
- Indexing for common queries

### Database Configuration

PostgreSQL runs in Docker. Database credentials and connection settings are stored in environment variables rather than committed to the repository.

---

## 2. Schema Overview

The database contains 8 tables:

| Table | Purpose |
|---|---|
| `users` | User accounts and authentication |
| `products` | Main product information |
| `variants` | Product configurations, prices, and stock |
| `carts` | One active cart per user |
| `cart_items` | Products currently in a cart |
| `wishlist_items` | Products saved by a user |
| `orders` | Completed/pending purchases |
| `order_items` | Products included in an order |

### Relationships

```text
users
 ├── carts ── cart_items ── products
 │                         └─ variants
 │
 ├── wishlist_items ────── products
 │
 └── orders ── order_items ── products
                           └─ variants

products ── variants
```

---

## 3. Table Design Decisions

I chose UUIDs across all tables because they give each record a unique ID without exposing predictable, sequential IDs, and they make the database easier to scale in the future.

### Users

- UUID primary key.
- Unique email for authentication.
- Passwords stored as hashes, not a plain text.
- `email_verified_at` is nullable because verification is optional/not completed immediately and this field is added because if later on we wanted to introduce email verfication to the    system it will be ready.
- Timestamps are used for record tracking.

### Products

- `slug` is unique and used to make the urls that contains the product identifier more readable.
- `description` uses `TEXT`.
- Prices use `DECIMAL(10,2)` to avoid floating-point issues.
- `stock_quantity` cannot be negative.
- `image_url` is nullable.

### Variants

Variants are stored separately because one product can have multiple configurations.

```text
Product: T-Shirt

Small  → $20
Medium → $20
Large  → $22
XL     → $25
```

Each variant therefore has its own price and stock. ( At first price was only available at the product level but I thought that a small t-shirt and a large t-shirt can have different prices that's why I added price to the variants table )

`options` I used PostgreSQL JSONB because different products can have different options such as size, color, storage, etc.
`image_url` I used an image url here because a variant can have different image from the image existing in the parent product ( if this field is null the image of the parent product will be used)

### Carts

A separate `carts` table is used because a cart has its own identity and lifecycle. Each user has one active cart.

### Cart Items

A cart item stores:

- Product
- Optional variant
- Quantity

Price and subtotal are not stored because they can be calculated from the current product/variant price.

### Wishlist Items

I didnt implement a separate `wishlists` because the current requirements only require one simple wishlist per user.

`wishlist_items` directly connects a user and a product.

A unique constraint on `(user_id, product_id)` prevents the user from putting the same product in his wishlist twice.

### Orders

An order stores the purchase-level information:

- User
- Address
- Total
- Status

The address is stored directly on the order because there are no requirements about saved addresses for a user.

### Order Items

Order items store:

- Product
- Optional variant
- Quantity
- `unit_price`

`unit_price` is stored as a snapshot because product prices can change after an order is created.

---

## 4. Relationships and Foreign Keys

Foreign keys are used to maintain valid relationships between tables.

Delete behavior is chosen according to the data's lifecycle:

- Cart items → `CASCADE` when their cart is deleted.
- Wishlist items → `CASCADE` when their user/product is deleted.
- Order items → `CASCADE` when their order is deleted.
- Order item product → `RESTRICT` so we cant delete a product if there are orders that include this product.
- Order item variant → `SET NULL` so an order remains valid if a variant is removed.

---

## 5. Constraints and Data Integrity

Important rules are enforced at the database level:

- Product price > 0
- Product stock >= 0
- Variant price > 0
- Variant stock >= 0
- Cart item quantity > 0
- Order total >= 0
- Order item quantity > 0
- Order item unit price > 0

Unique constraints are also used for values such as emails, product slugs, and wishlist entries.

Backend validation will still be performed to provide proper API errors, while database constraints provide an additional layer of protection.

---

## 6. Indexing Strategy

Indexes are added basically on the foreign keys that are commonly used for lookups and joins so we can get a better query performance when joining on multiple tables.

| Table | Index |
|---|---|
| `variants` | `product_id` |
| `cart_items` | `cart_id` |
| `wishlist_items` | `user_id` |
| `orders` | `user_id` |
| `order_items` | `order_id` |

Primary keys and unique constraints are automatically indexed.

---

## 7. Pricing and Stock

For products without variants,we get the price and stock come from the `products` table.

For products with variants, the selected variant determines the price and stock.

The frontend sends the product/variant selection, not the final price. The backend retrieves the current price from the database.

During checkout, the selected price is stored in `order_items.unit_price` so historical orders are not affected by future price changes.

Stock validation is performed on the server.

---

## 8. Cart vs Order Data

The cart represents the user's current shopping state.

The order represents a historical purchase.

Therefore:

```text
Cart:
product + variant + quantity
        ↓
Checkout
        ↓
Order:
product + variant + quantity + unit_price
```

This separation prevents changes to current product data from modifying historical orders.

---

## 9. Migration Strategy

Sequelize migrations are used instead of automatically synchronizing models with the database.

Migrations are version-controlled and contain both `up` and `down` operations.

They are created in dependency order so referenced tables exist before foreign keys are added.

---

## 10. Seed Data

Seed data provides:

- 15 products
- Products with and without variants
- Multiple variants for at least 3 products
- Different prices and stock levels
- A test user

This way the main application flows can be tested immediately after running the migrations and seeders.

---