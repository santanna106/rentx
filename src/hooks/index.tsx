import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';

interface AppProviderProsp {
    children:ReactNode;
}

function AppProvider({children}: AppProviderProsp ){
    return(
      <AuthProvider>
        {children}
      </AuthProvider>
    )
    
}

export { AppProvider };