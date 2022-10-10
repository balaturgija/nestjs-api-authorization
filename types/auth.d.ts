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
    role: Role;
}

interface UserRole {
    id: string;
    username: string;
    email: string;
    password: string;
    roleId: string;
    role: Role;
}
