import { makeAutoObservable } from 'mobx';
import { apiGet } from '../../resources/api_calls/api_methods';
import apiUrl from '../../resources/api_calls/api_urls';


class Store1 {

  price = 1;

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

}

export default  Store1;