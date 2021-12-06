import { makeAutoObservable } from 'mobx';
import { apiGet } from '../../resources/api_calls/api_methods';
import apiUrl from '../../resources/api_calls/api_urls';


class UserStore {

  price = 1;

  listUser =[];

  constructor() {
    makeAutoObservable(this)

  }

  setPrice() {
    this.price += 1;
    console.log(this.price)
  }

  fetchProducts = async() => {
  const response =  await apiGet(apiUrl.fetchAllProducts);
  console.log("respo",response);
  this.price += response.body.length;
}

  fetchUserFromDB = async() => {
    const resp = await apiGet(apiUrl.listUsers);
    if(resp.status === 200){
      this.listUser = resp.body;
      console.log(resp.body);
    }
    else{
      console.log("went wroing",resp.status);
    }
  }

}

export default  UserStore;