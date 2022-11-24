interface Robot {
    id: string;
    name: string;
    startPrice: number;
    finalPrice: number;
    status: string;
    creatorsSignature: string;
    batteryId: string;
    battery?: Battery;
}

interface RobotCreate {
    name: string;
    startPrice: number;
    batteryId: string;
}
