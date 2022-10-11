interface Robot {
    id: string;
    name: string;
    batteryId: string;
    battery?: Battery;
}

interface RobotCreate {
    name: string;
    batteryId: string;
}
