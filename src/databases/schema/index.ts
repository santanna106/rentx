import { appSchema } from '@nozbe/watermelondb';
import { carSchema } from './carSchema';

import { userShcema } from './userSchema';

const schemas = appSchema({
    version:2,
    tables:[
        userShcema,
        carSchema
    ]
});

export { schemas }