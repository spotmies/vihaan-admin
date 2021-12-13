import { makeAutoObservable } from "mobx";
import { apiGet, apiPostPut } from "../../resources/api_calls/api_methods";
import apiUrl from "../../resources/api_calls/api_urls";

class UserStore {
  price = 1;

  listUser = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setPrice() {
    this.price += 1;
    console.log(this.price);
  }

  fetchProducts = async () => {
    const response = await apiGet(apiUrl.fetchAllProducts);
    console.log("respo", response);
    this.price += response.body.length;
  };

  fetchUserFromDB = async () => {
    if (this.loading) {
      alert("loading try again later..");
      return;
    }
    console.log("getting users from db");
    this.loading = true;
    const resp = await apiGet(apiUrl.listUsers);
    this.loading = false;
    if (resp.status === 200) {
      this.listUser = resp.body;
      console.log(resp.body);
    } else {
      console.log("went wroing", resp.status);
    }
  };
  deleteUser = async (uId) => {
    if (this.loading) {
      alert("loading try again later..");
      return;
    }
    let body = {
      isDeleted: true,
    };
    let path = `/user/users/${uId}`;
    this.loading = true;
    const resp = await apiPostPut(body, path, "PUT");
    this.loading = false;
    if (resp.status === 200 || resp.status === 204) {
      this.delete2(uId);
    }
  };

  delete2 = (uId) => {
    let remainingUsers = this.listUser.filter((user) => user.uId !== uId);
    console.log(remainingUsers);
    this.listUser = remainingUsers;
  };

  getUserDetById = (uId) => {
     let rideUser = this.listUser.find((user) => user._id === uId);
     console.log(rideUser);
     return rideUser;

  }

  userBanBlock = async (lUserState, uId) => {
    if (this.loading) {
      alert("loading try again later..");
      return;
    }
    const body = {
      userState: lUserState,
    };
    const path = `/user/users/${uId}`;
    this.loading = true;
    const resp = await apiPostPut(body, path, "PUT");
    this.loading = false;
    if (resp.status === 200 || resp.status === 204 || resp.status===403){
     const index = this.listUser.findIndex(user => user.uId === uId ) 
     this.listUser[index].userState = lUserState;
     }
     else
     {
       alert(`something went wrong please try again.....${resp.status}`)
     }
  };
}




export default UserStore;
