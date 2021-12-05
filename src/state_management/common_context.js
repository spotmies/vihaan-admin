import React from 'react'
import { useLocalStore } from 'mobx-react';
import { commonStore } from './common_store';


const CommonContext = React.createContext(null);

export const CommonProvider =({children}) => {
    const commonStoreInContext = useLocalStore(commonStore);
    return <CommonContext.Provider value={commonStoreInContext}>
        {children}
    </CommonContext.Provider>
}
export const useCommonStore = () => React.useContext(CommonContext);
