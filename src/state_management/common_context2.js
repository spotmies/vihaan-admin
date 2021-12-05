import React from 'react'
import { useLocalStore } from 'mobx-react';
import { commonStore2 } from './common_store2';


const CommonContext2 = React.createContext(null);

export const CommonProvider2 =({children}) => {
    const commonStoreInContext2 = useLocalStore(commonStore2);
    return <CommonContext2.Provider value={commonStoreInContext2}>
        {children}
    </CommonContext2.Provider>
}
export const useCommonStore2 = () => React.useContext(CommonContext2);
