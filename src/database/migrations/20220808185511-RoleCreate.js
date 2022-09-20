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
            const tableCreate = await queryInterface.createTable(
                'roles',
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
                    abrv: {
                        field: 'abrv',
                        type: Sequelize.STRING(255),
                        allowNull: true,
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
            if (tableCreatePromises.length > 0)
                await Promise.all(tableCreatePromises);

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
                'roles',
                transaction
            );
            tableRemovePromises.push(tableRemove);
            if (tableRemovePromises.length > 0)
                await Promise.all(tableRemovePromises);

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.log(error);
        }
    },
};
