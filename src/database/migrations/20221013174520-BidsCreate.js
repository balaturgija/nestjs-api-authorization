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
            await queryInterface.createTable(
                'bids',
                {
                    id: {
                        field: 'id',
                        type: Sequelize.UUID,
                        defaultValue: Sequelize.UUIDV4,
                        allowNull: false,
                        primaryKey: true,
                    },
                    offerPrice: {
                        field: 'offer_price',
                        type: Sequelize.DECIMAL(9, 2),
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
                    auctionId: {
                        field: 'auction_id',
                        type: Sequelize.UUID,
                        allowNull: false,
                        onDelete: 'CASCADE',
                        references: {
                            key: 'id',
                            model: {
                                tableName: 'auctions',
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

            await queryInterface.addConstraint(
                'bids',
                {
                    type: 'foreign key',
                    fields: ['user_id'],
                    name: 'FK_bid_user_user_id',
                    onDelete: 'CASCADE',
                    references: {
                        table: 'users',
                        field: 'id',
                    },
                },
                transaction
            );

            await queryInterface.addConstraint(
                'bids',
                {
                    type: 'foreign key',
                    fields: ['auction_id'],
                    name: 'FK_bid_auction_auction_id',
                    onDelete: 'CASCADE',
                    references: {
                        table: 'auctions',
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
            await queryInterface.dropTable('bids', transaction);

            await transaction.commit;
        } catch (error) {
            await transaction.rollback();
            console.log(error);
        }
    },
};
