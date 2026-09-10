'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'essence-mascara-lash-princess',
        title: 'Essence Mascara Lash Princess',
        description:
          'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
        price: 9.99,
        stock_quantity: 50,
        image_url:
          'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'eyeshadow-palette-with-mirror',
        title: 'Eyeshadow Palette with Mirror',
        description:
          'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it is convenient for on-the-go makeup application.',
        price: 19.99,
        stock_quantity: 30,
        image_url:
          'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'powder-canister',
        title: 'Powder Canister',
        description:
          'The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.',
        price: 4.99,
        stock_quantity: 40,
        image_url:
          'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'red-lipstick',
        title: 'Red Lipstick',
        description:
          'The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.',
        price: 12.99,
        stock_quantity: 45,
        image_url:
          'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'red-nail-polish',
        title: 'Red Nail Polish',
        description:
          'The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.',
        price: 8.99,
        stock_quantity: 35,
        image_url:
          'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'calvin-klein-ck-one',
        title: 'Calvin Klein CK One',
        description:
          'CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It is a versatile fragrance suitable for everyday wear.',
        price: 49.99,
        stock_quantity: 25,
        image_url:
          'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'chanel-coco-noir-eau-de',
        title: 'Chanel Coco Noir Eau De',
        description:
          'Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.',
        price: 129.99,
        stock_quantity: 15,
        image_url:
          'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'dior-jadore',
        title: "Dior J'adore",
        description:
          "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
        price: 89.99,
        stock_quantity: 20,
        image_url:
          "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'dolce-shine-eau-de-parfum',
        title: 'Dolce Shine Eau de Parum',
        description:
          'Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It is a joyful and youthful scent.',
        price: 69.99,
        stock_quantity: 18,
        image_url:
          'https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'gucci-bloom-eau-de-parfum',
        title: 'Gucci Bloom Eau de Parfum',
        description:
          'Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It is a modern and romantic scent.',
        price: 79.99,
        stock_quantity: 22,
        image_url:
          'https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'annibale-colombo-bed',
        title: 'Annibale Colombo Bed',
        description:
          'The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.',
        price: 599.99,
        stock_quantity: 8,
        image_url:
          'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'annibale-colombo-sofa',
        title: 'Annibale Colombo Sofa',
        description:
          'The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.',
        price: 299.99,
        stock_quantity: 6,
        image_url:
          'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'bedside-table-african-cherry',
        title: 'Bedside Table African Cherry',
        description:
          'The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.',
        price: 34.99,
        stock_quantity: 12,
        image_url:
          'https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'knoll-saarinen-executive-conference-chair',
        title: 'Knoll Saarinen Executive Conference Chair',
        description:
          'The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.',
        price: 29.99,
        stock_quantity: 10,
        image_url:
          'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: Sequelize.literal('gen_random_uuid()'),
        slug: 'wooden-bathroom-sink-with-mirror',
        title: 'Wooden Bathroom Sink With Mirror',
        description:
          'The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.',
        price: 199.99,
        stock_quantity: 7,
        image_url:
          'https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/1.webp',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', {
      slug: {
        [Sequelize.Op.in]: [
          'essence-mascara-lash-princess',
          'eyeshadow-palette-with-mirror',
          'powder-canister',
          'red-lipstick',
          'red-nail-polish',
          'calvin-klein-ck-one',
          'chanel-coco-noir-eau-de',
          'dior-jadore',
          'dolce-shine-eau-de',
          'gucci-bloom-eau-de',
          'annibale-colombo-bed',
          'annibale-colombo-sofa',
          'bedside-table-african-cherry',
          'knoll-saarinen-executive-conference-chair',
          'wooden-bathroom-sink-with-mirror',
        ],
      },
    });
  },
};