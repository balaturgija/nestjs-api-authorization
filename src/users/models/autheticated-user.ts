export class AuthenticatedUser {
    constructor(
        readonly id: string,
        readonly username: string,
        readonly email: string,
        readonly roleId: string,
        readonly walletId: string,
        readonly role?: Role,
        readonly wallet?: Wallet,
        readonly permissions?: Role[]
    ) {}
}
