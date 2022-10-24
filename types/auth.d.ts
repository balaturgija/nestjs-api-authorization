interface LoginResponseData {
    userData: TokenOptions;
    token: string;
}

interface TokenOptions {
    id: string;
    username: string;
    email: string;
    password: string;
    roleId: string;
    walletId: string;
    wallet: Wallet;
    role: Role;
}
