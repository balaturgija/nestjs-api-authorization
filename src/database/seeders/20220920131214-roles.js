'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.sequelize.query(
            'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'
        );
        await queryInterface.bulkInsert(
            'roles',
            [
                {
                    id: Sequelize.literal('uuid_generate_v4()'),
                    name: 'Admin',
                    abrv: 'Admin',
                    created_at: new Date(),
                    updated_at: new Date(),
                    deleted_at: null,
                },
                {
                    id: Sequelize.literal('uuid_generate_v4()'),
                    name: 'Engineer',
                    abrv: 'Engineer',
                    created_at: new Date(),
                    updated_at: new Date(),
                    deleted_at: null,
                },
                {
                    id: Sequelize.literal('uuid_generate_v4()'),
                    name: 'Collector',
                    abrv: 'Collector',
                    created_at: new Date(),
                    updated_at: new Date(),
                    deleted_at: null,
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
