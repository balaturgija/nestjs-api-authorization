enum Provider {
    Sequelize = 'SEQUELIZE',
    BatteryRepository = 'BATTERY_REPOSITORY',
    RobotRepository = 'ROBOTS_REPOSITORY',
    UserRepository = 'USER_REPOSITORY',
    UserBatteryRepository = 'USER_BATTERY_REPOSITORY',
}

enum TableName {
    Batteries = 'batteries',
    Robots = 'robots',
    Users = 'users',
    UserBatteries = 'user_batteries',
}

const SWAGGER_CONFIG = {
    title: 'title',
    description: 'descrioption',
    version: '0.0.00',
    tags: ['robots', 'batteries'],
};

export { Provider, TableName, SWAGGER_CONFIG };
