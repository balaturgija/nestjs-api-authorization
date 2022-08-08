'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();

    try {
      let tableCreatePromises = [];
      let constraintsCreatePromises = [];
      const tableCreate = await queryInterface.createTable(
        'robots',
        {
          id: {
            field: 'id',
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            field: 'name',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          batteryId: {
            field: 'battery_id',
            type: Sequelize.UUID,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
              key: 'id',
              model: {
                tableName: 'batteries',
              },
            },
          },
          createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          deletedAt: {
            field: 'deleted_at',
            type: Sequelize.DATE,
            defaultValue: null,
          },
        },
        {
          paranoid: true,
        },
        transaction,
      );
      tableCreatePromises.push(tableCreate);

      const robotBatteriesConstraint = await queryInterface.addConstraint(
        'robots',
        {
          type: 'foreign key',
          fields: ['battery_id'],
          name: 'FK_robots_batteries_battery_id',
          onDelete: 'CASCADE',
          references: {
            table: 'batteries',
            field: 'id',
          },
        },
        transaction,
      );

      constraintsCreatePromises.push(robotBatteriesConstraint);

      if (tableCreatePromises.length > 0)
        await Promise.all(tableCreatePromises);

      if (constraintsCreatePromises.length > 0)
        await Promise.all(constraintsCreatePromises);

      await transaction.commit();
    } catch (error) {
      transaction.rollback();
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      let tableRemovePromises = [];
      const tableRemove = await queryInterface.dropTable('robots', transaction);
      tableRemovePromises.push(tableRemove);
      if (tableRemovePromises.length > 0)
        await Promise.all(tableRemovePromises);

      await transaction.commit;
    } catch (error) {
      await transaction.rollback();
      console.log(error);
    }
  },
};
