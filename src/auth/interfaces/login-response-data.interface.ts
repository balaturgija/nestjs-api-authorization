import { User } from '../../users/interfaces/user.interface';

export interface LoginResponseData {
    userTokenData: User;
    token: string;
}
