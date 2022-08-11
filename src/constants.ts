export enum Provider {
  Sequelize = 'SEQUELIZE',
  BatteryRepository = 'BATTERY_REPOSITORY',
  RobotRepository = 'ROBOTS_REPOSITORY',
  UserRepository = 'USER_REPOSITORY',
  UserBatteryRepository = 'USER_BATTERY_REPOSITORY',
}

export enum TableName {
  Batteries = 'batteries',
  Robots = 'robots',
  Users = 'users',
  UserBatteries = 'user_batteries',
}
