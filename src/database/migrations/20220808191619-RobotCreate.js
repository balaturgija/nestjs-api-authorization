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
                    startPrice: {
                        field: 'start_price',
                        type: Sequelize.DECIMAL(9, 2),
                        allowNull: false,
                    },
                    currentPrice: {
                        field: 'current_price',
                        type: Sequelize.DECIMAL(9, 2),
                        allowNull: false,
                    },
                    status: {
                        field: 'status',
                        type: Sequelize.ENUM({
                            values: ['Auction', 'Collected', 'Created'],
                        }),
                        defaultValue: 'Created',
                    },
                    creatorsSignature: {
                        field: 'creators_signature',
                        type: Sequelize.STRING(255),
                        allowNull: false,
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
                transaction
            );

            await queryInterface.addConstraint('robots', {
                type: 'foreign key',
                fields: ['user_id'],
                name: 'FK_robots_users_user_id',
                onDelete: 'CASCADE',
                references: {
                    table: 'users',
                    field: 'id',
                },
            });

            await queryInterface.addConstraint(
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
                transaction
            );

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
            await queryInterface.dropTable('robots', transaction);

            await transaction.commit;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
        }
    },
};
