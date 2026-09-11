'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('variants',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },

        product_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },

        options: {
          type: Sequelize.JSONB,
          allowNull: false,
        },

        price: {
          type: Sequelize.DECIMAL(10,2),
          allowNull: false,
        },

        image_url: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        stock_quantity: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          allowNull: false,
        },

        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },

        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
      }
    );

    await queryInterface.addConstraint('variants', {
      fields: ['stock_quantity'],
      type: 'check',
      where: {
        stock_quantity: {
          [Sequelize.Op.gte]: 0,
        },
      },
      name: 'variants_stock_quantity_non_negative',
    });

    await queryInterface.addConstraint('variants', {
      fields: ['price'],
      type: 'check',
      where: {
        price: {
          [Sequelize.Op.gt]: 0,
        },
      },
      name: 'variants_price_positive',
    })

    await queryInterface.addIndex('variants', ['product_id'], {
      name: 'variants_product_id_idx',
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('variants');
  }
};
