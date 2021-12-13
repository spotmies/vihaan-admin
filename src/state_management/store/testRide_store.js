import { makeAutoObservable } from "mobx";
import { apiGet, apiPostPut } from "../../resources/api_calls/api_methods";
import apiUrl from "../../resources/api_calls/api_urls";

class TestRides {
  price = 1;

  listRides = [];
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

  fetchRidesFromDB = async () => {
    if (this.loading) {
      alert("loading try again later..");
      return;
    }
    console.log("getting rides from db");
    this.loading = true;
    const resp = await apiGet(apiUrl.testRides);
    this.loading = false;
    if (resp.status === 200) {
      this.listRides = resp.body;
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
    let path = `/test-ride/test-rides/${uId}`;
    this.loading = true;
    const resp = await apiPostPut(body, path, "PUT");
    this.loading = false;
    if (resp.status === 200 || resp.status === 204) {
      this.delete2(uId);
    }
  };

  delete2 = (uId) => {
    let remainingRides = this.listUser.filter((ride) => ride.uId !== uId);
    console.log(remainingRides);
    this.testRides = remainingRides;
  };
}

export default TestRides;
