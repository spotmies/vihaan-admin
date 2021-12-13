import { makeAutoObservable } from "mobx";

class CommonStore {
  
  isUserAuthenticated = false;

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
