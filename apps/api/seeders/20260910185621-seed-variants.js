"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = await queryInterface.sequelize.query(
      `
        SELECT id, slug
        FROM products
        WHERE slug IN (
          'dior-jadore',
          'calvin-klein-ck-one',
          'gucci-bloom-eau-de-parfum',
          'wooden-bathroom-sink-with-mirror',
          'annibale-colombo-sofa',
          'red-lipstick'
        );
      `,
      {
        type: Sequelize.QueryTypes.SELECT,
      },
    );

    const productIds = Object.fromEntries(
      products.map((product) => [product.slug, product.id]),
    );

    const requiredSlugs = [
      "dior-jadore",
      "calvin-klein-ck-one",
      "gucci-bloom-eau-de-parfum",
      "wooden-bathroom-sink-with-mirror",
      "annibale-colombo-sofa",
      "red-lipstick",
    ];

    const missingSlugs = requiredSlugs.filter(
      (slug) => !productIds[slug],
    );

    if (missingSlugs.length > 0) {
      throw new Error(
        `Missing products: ${missingSlugs.join(", ")}`,
      );
    }

    await queryInterface.bulkInsert("variants", [
      // Dior J'adore
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["dior-jadore"],
        options: JSON.stringify({
          size: "30ml",
        }),
        price: 89.99,
        stock_quantity: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["dior-jadore"],
        options: JSON.stringify({
          size: "50ml",
        }),
        price: 119.99,
        stock_quantity: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["dior-jadore"],
        options: JSON.stringify({
          size: "100ml",
        }),
        price: 159.99,
        stock_quantity: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Calvin Klein CK One
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["calvin-klein-ck-one"],
        options: JSON.stringify({
          size: "50ml",
        }),
        price: 49.99,
        stock_quantity: 12,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["calvin-klein-ck-one"],
        options: JSON.stringify({
          size: "100ml",
        }),
        price: 69.99,
        stock_quantity: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Gucci Bloom Eau de Parfum
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["gucci-bloom-eau-de-parfum"],
        options: JSON.stringify({
          size: "30ml",
        }),
        price: 79.99,
        stock_quantity: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["gucci-bloom-eau-de-parfum"],
        options: JSON.stringify({
          size: "50ml",
        }),
        price: 109.99,
        stock_quantity: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["gucci-bloom-eau-de-parfum"],
        options: JSON.stringify({
          size: "100ml",
        }),
        price: 149.99,
        stock_quantity: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Wooden Bathroom Sink With Mirror
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["wooden-bathroom-sink-with-mirror"],
        options: JSON.stringify({
          finish: "Natural Wood",
        }),
        price: 199.99,
        stock_quantity: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["wooden-bathroom-sink-with-mirror"],
        options: JSON.stringify({
          finish: "Dark Wood",
        }),
        price: 219.99,
        stock_quantity: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Annibale Colombo Sofa
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["annibale-colombo-sofa"],
        options: JSON.stringify({
          color: "Beige",
          seats: 3,
        }),
        price: 299.99,
        stock_quantity: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["annibale-colombo-sofa"],
        options: JSON.stringify({
          color: "Dark Gray",
          seats: 3,
        }),
        price: 319.99,
        stock_quantity: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // Red Lipstick
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["red-lipstick"],
        options: JSON.stringify({
          finish: "Matte",
        }),
        price: 12.99,
        stock_quantity: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: Sequelize.literal("gen_random_uuid()"),
        product_id: productIds["red-lipstick"],
        options: JSON.stringify({
          finish: "Glossy",
        }),
        price: 14.99,
        stock_quantity: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM variants
      WHERE product_id IN (
        SELECT id
        FROM products
        WHERE slug IN (
          'dior-jadore',
          'calvin-klein-ck-one',
          'gucci-bloom-eau-de-parfum',
          'wooden-bathroom-sink-with-mirror',
          'annibale-colombo-sofa',
          'red-lipstick'
        )
      );
    `);
  },
};