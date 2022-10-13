interface Bid {
    id: string;
    offerPrice: number;
    userId: string;
    user?: User;
    auctionId: string;
    auction?: Auction;
}
