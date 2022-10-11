interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    roleId: string;
    role?: Role;
}
