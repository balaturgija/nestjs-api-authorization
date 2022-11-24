interface Auction {
    id: string;
    robotId: string;
    robot?: Robot;
}

interface AuctionToken {
    user: User;
    auctionId: string;
}
