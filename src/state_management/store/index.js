import React from 'react';
import Store1 from './user_store';
import Store2 from './store2';
import CommonStore from './common_store';

class RootStore {
    constructor() {
      this.UserStore = new Store1(this)
      this.Store2 = new Store2(this)
      this.CommonStore = new CommonStore(this)
    }
  }
  
  const StoresContext = React.createContext(new RootStore());
  
  // this will be the function available for the app to connect to the stores
  export const useStores = () => React.useContext(StoresContext);