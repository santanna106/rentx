import { appSchema } from '@nozbe/watermelondb';

import { userShcema } from './userSchema';

const schemas = appSchema({
    version:1,
    tables:[
        userShcema
    ]
});

export { schemas }