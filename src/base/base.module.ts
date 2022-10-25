import { Global, Module } from '@nestjs/common';
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
