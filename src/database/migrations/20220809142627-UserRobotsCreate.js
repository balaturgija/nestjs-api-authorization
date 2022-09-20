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
                'user_robots',
                {
                    id: {
                        field: 'id',
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4,
                        allowNull: false,
                        primaryKey: true,
                    },
                    userId: {
                        field: 'user_id',
                        type: Sequelize.UUID,
                        allowNull: false,
                        onDelete: 'CASCADE',
                        references: {
                            key: 'id',
                            model: {
                                tableName: 'users',
                            },
                        },
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

            const urUsersConstraints = await queryInterface.addConstraint(
                'user_robots',
                {
                    type: 'foreign key',
                    fields: ['user_id'],
                    name: 'FK_user_robots_users_user_id',
                    onDelete: 'CASCADE',
                    references: {
                        table: 'users',
                        field: 'id',
                    },
                },
                transaction
            );
            constraintsCreatePromises.push(urUsersConstraints);

            const urRobotsConstraints = await queryInterface.addConstraint(
                'user_robots',
                {
                    type: 'foreign key',
                    fields: ['robot_id'],
                    name: 'FK_user_robots_robots_robot_id',
                    onDelete: 'CASCADE',
                    references: {
                        table: 'robots',
                        field: 'id',
                    },
                },
                transaction
            );
            constraintsCreatePromises.push(urRobotsConstraints);

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
            const tableRemove = await queryInterface.dropTable(
                'user_robots',
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
