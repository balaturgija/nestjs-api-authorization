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
            await queryInterface.createTable(
                'users',
                {
                    id: {
                        field: 'id',
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4,
                        allowNull: false,
                        primaryKey: true,
                    },
                    username: {
                        field: 'username',
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    email: {
                        field: 'email',
                        type: Sequelize.STRING(255),
                        allowNull: false,
                    },
                    password: {
                        field: 'password',
                        type: Sequelize.TEXT,
                        allowNull: false,
                    },
                    roleId: {
                        field: 'role_id',
                        type: Sequelize.UUID,
                        allowNull: false,
                        references: {
                            key: 'id',
                            model: {
                                tableName: 'roles',
                            },
                        },
                    },
                    walletId: {
                        field: 'wallet_id',
                        type: Sequelize.UUID,
                        allowNull: false,
                        references: {
                            key: 'id',
                            model: {
                                tableName: 'wallets',
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

            await queryInterface.addConstraint('users', {
                type: 'foreign key',
                fields: ['role_id'],
                name: 'FK_users_roles_role_id',
                references: {
                    table: 'roles',
                    field: 'id',
                },
            });

            await queryInterface.addConstraint('users', {
                type: 'foreign key',
                fields: ['wallet_id'],
                name: 'FK_users_wallets_wallet_id',
                references: {
                    table: 'wallets',
                    field: 'id',
                },
            });

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
            await queryInterface.dropTable('users', transaction);

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.log(error);
        }
    },
};
