'use strict';

/** @type {import('sequelize-cli').Migration} */
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
                'auctions',
                {
                    id: {
                        field: 'id',
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4,
                        allowNull: false,
                        primaryKey: true,
                    },
                    robotId: {
                        field: 'robot_id',
                        type: Sequelize.UUID,
                        allowNull: false,
                        onDelete: 'CASCADE',
                        references: {
                            key: 'id',
                            model: {
                                tableName: 'robots',
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
                transaction
            );
            tableCreatePromises.push(tableCreate);

            const urRobotsConstraints = await queryInterface.addConstraint(
                'auctions',
                {
                    type: 'foreign key',
                    fields: ['robot_id'],
                    name: 'FK_auctions_robot_robot_id',
                    onDelete: 'CASCADE',
                    references: {
                        table: 'robots',
                        field: 'id',
                    },
                },
                transaction
            );
            constraintsCreatePromises.push(urRobotsConstraints);
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
            const tableRemove = await queryInterface.dropTable(
                'auctions',
                transaction
            );
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
