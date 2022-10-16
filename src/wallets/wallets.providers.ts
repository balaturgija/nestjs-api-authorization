import { Provider } from '../constants';
import { WalletEntity } from './entities/wallet.entity';

export const walletsProviders = [
    {
        provide: Provider.WalletRepository,
        useValue: WalletEntity,
    },
];
