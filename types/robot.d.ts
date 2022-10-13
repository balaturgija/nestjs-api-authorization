interface Robot {
    id: string;
    name: string;
    startPrice: number;
    currentPrice: number;
    status: string;
    createorsSignature: string;
    batteryId: string;
    battery?: Battery;
}

interface RobotCreate {
    name: string;
    startPrice: number;
    batteryId: string;
}
