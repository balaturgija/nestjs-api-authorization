import { RoleModel } from '../../roles/models/role.model';
import { WalletModel } from '../../wallets/models/wallet.model';

export class ValidateUserEmailAndPassModel {
    constructor(
        readonly id: string,
        readonly username: string,
        readonly email: string,
        readonly password: string,
        readonly role: RoleModel,
        readonly wallet: WalletModel
    ) {}
}
