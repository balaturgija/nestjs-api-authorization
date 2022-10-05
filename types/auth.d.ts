interface LoginResponseData {
    userTokenData: User;
    token: string;
}

interface TokenOptions {
    id: string;
    username: string;
    email: string;
    password: string;
    roleId: string;
}
