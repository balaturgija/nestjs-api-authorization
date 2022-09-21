enum Provider {
    Sequelize = 'SEQUELIZE',
    BatteryRepository = 'BATTERY_REPOSITORY',
    RobotRepository = 'ROBOTS_REPOSITORY',
    RolesRepository = 'ROLES_REPOSITORY',
    UserRepository = 'USER_REPOSITORY',
    UserBatteryRepository = 'USER_BATTERY_REPOSITORY',
}

enum TableName {
    Batteries = 'batteries',
    Robots = 'robots',
    Roles = 'roles',
    Users = 'users',
    UserBatteries = 'user_batteries',
}

enum Role {
    Admin = 'Admin',
    Engineer = 'Engineer',
    Customer = 'Customer',
}

const SWAGGER_CONFIG = {
    title: 'title',
    description: 'descrioption',
    version: '0.0.00',
    tags: ['robots', 'batteries', 'auth'],
};

export { Provider, TableName, Role, SWAGGER_CONFIG };
