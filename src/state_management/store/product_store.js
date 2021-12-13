import { makeAutoObservable } from "mobx";
import { apiGet, apiPostPut } from "../../resources/api_calls/api_methods";
import apiUrl from "../../resources/api_calls/api_urls";

class ProductStore {
  price = 1;

  listProducts = [];
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

  fetchProductFromDB = async () => {
    if (this.loading) {
      alert("loading try again later..");
      return;
    }
    console.log("getting users from db");
    this.loading = true;
    const resp = await apiGet(apiUrl.listProducts);
    this.loading = false;
    if (resp.status === 200) {
      this.listProducts = resp.body;
      console.log(resp.body);
    } else {
      console.log("went wroing", resp.status);
    }
  };

  deleteProduct = async (uId) => {
    if (this.loading) {
      alert("loading Please wait..");
      return;
    }
    let body = {
      isDeleted: true,
    };
    let path = `/product/products/${uId}`;
    this.loading = true;
    const resp = await apiPostPut(body, path, "PUT");
    this.loading = false;
    if (resp.status === 200 || resp.status === 204) {
      this.delete2(uId);
    }
  };

  delete2 = (uId) => {
    let remainingProds = this.listProducts.filter((user) => user._Id !== uId);
    console.log(remainingProds);
    this.listProducts = remainingProds;
  };

  getProdDetById = (uId) => {
     let rideProd = this.listProducts.find((user) => user._id.toString() == uId.toString());
    if(rideProd == null|| rideProd == undefined) return " ";
     console.log(rideProd);
     return rideProd;

  }

}

export default ProductStore;
