import { Global, Module } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JSONAPISerializer = require('json-api-serializer');

@Global()
@Module({
    providers: [
        {
            provide: 'SERIALIZER',
            useFactory() {
                return new JSONAPISerializer();
            },
        },
    ],
    exports: ['SERIALIZER'],
})
export class BaseModule {}
