import { makeAutoObservable } from "mobx";

class CommonStore {
  
  isUserAuthenticated = true;

  constructor() {
    makeAutoObservable(this);
  }
  login() {
    this.isUserAuthenticated = true;
    
  }
  logout() {
    this.isUserAuthenticated = false;

  }
}
export default CommonStore;
