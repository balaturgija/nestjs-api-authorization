export enum Provider {
    Sequelize = 'SEQUELIZE',
    BatteryRepository = 'BATTERY_REPOSITORY',
    RobotRepository = 'ROBOTS_REPOSITORY',
    WalletRepository = 'WALLET_REPOSITORY',
    RolesRepository = 'ROLES_REPOSITORY',
    UserRepository = 'USER_REPOSITORY',
    UserBatteryRepository = 'USER_BATTERY_REPOSITORY',
    Jwt = 'jwt',
    Local = 'local',
}

export enum TableName {
    Batteries = 'batteries',
    Robots = 'robots',
    Roles = 'roles',
    Users = 'users',
    UserRobots = 'user_robots',
    Wallets = 'wallets',
    Bids = 'bids',
    Auctions = 'auctions',
}

export enum Role {
    Admin = 'Admin',
    Engineer = 'Engineer',
    Auctioneer = 'Collector',
}

export enum RobotStatus {
    Created = 'Created',
    Collected = 'Collected',
    Auction = 'Auction',
}

export enum MoneyAction {
    Deposit = 'Deposit',
    Withdraw = 'Withdraw',
}

export const SWAGGER_CONFIG = {
    title: 'title',
    description: 'descrioption',
    version: '0.0.00',
    tags: [
        'robots',
        'batteries',
        'auth',
        'wallets',
        'user_robots',
        'bids',
        'auctions',
    ],
};
