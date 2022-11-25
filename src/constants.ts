export enum Provider {
    Sequelize = 'SEQUELIZE',
}

export enum TableName {
    Batteries = 'batteries',
    Robots = 'robots',
    Roles = 'roles',
    Users = 'users',
    Wallets = 'wallets',
    Bids = 'bids',
    Auctions = 'auctions',
    AuctionTokens = 'auction_tokends',
}

export enum Role {
    Engineer = 'Engineer',
    Collector = 'Collector',
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

export enum SortDirection {
    Asc = 'asc',
    Desc = 'desc',
}

export const SWAGGER_CONFIG = {
    title: 'title',
    description: 'descrioption',
    version: '0.0.00',
    tags: ['robots', 'batteries', 'auth', 'wallets', 'bids', 'auctions'],
};
