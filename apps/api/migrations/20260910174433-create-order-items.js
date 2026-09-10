"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_items", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      order_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },

      variant_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "variants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      unit_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
      },
    });

    await queryInterface.addConstraint("order_items", {
      fields: ["quantity"],
      type: "check",
      where: {
        quantity: {
          [Sequelize.Op.gt]: 0,
        },
      },
      name: "order_items_quantity_positive",
    });

    await queryInterface.addConstraint("order_items", {
      fields: ["unit_price"],
      type: "check",
      where: {
        unit_price: {
          [Sequelize.Op.gt]: 0,
        },
      },
      name: "order_items_unit_price_positive",
    });

    await queryInterface.addIndex("order_items", ["order_id"], {
      name: "order_items_order_id_idx",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order_items");
  },
};