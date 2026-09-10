'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },

        slug: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },

        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },

        price: {
          type: Sequelize.DECIMAL(10,2),
          allowNull: false,
        },

        stock_quantity: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },

        image_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },

        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        }
      }
    );

    await queryInterface.addConstraint('products', {
      fields: ['price'],
      type: 'check',
      where: {
        price: {
          [Sequelize.Op.gt]: 0,
        },
      },
      name: 'products_price_positive',
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('products');
  }
};
