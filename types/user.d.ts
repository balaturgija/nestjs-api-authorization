interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    roleId: string;
    walletId: string;
    role?: Role;
    wallet?: Wallet;
}
