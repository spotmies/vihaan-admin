import { makeAutoObservable } from "mobx";
import { apiDelete, apiGet, apiPostPut } from "../../resources/api_calls/api_methods";
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

  deleteRide = async (rId) => {
    if (this.loading) {
      alert("loading try again later ..");
      return;
    }
    let body = {
      isDeleted: true,
    };
    let path = `/test-ride/test-rides/${rId}`;
    this.loading = true;
    const resp = await apiDelete(path)
    this.loading = false;
    console.log("deleted product")
    if (resp.status === 200 || resp.status === 204) {
      this.delete2(rId);
    }
  };

  delete2 = (rId) => {
    console.log("deleting local product")
    var index = this.listRides.findIndex((ride) => ride.driveId === rId);
    console.log(index);
    if(index > -1 ) {
      this.listRides.splice(index, 1);
    }
    //this.testRides = indexOf(index);
  };
}

export default TestRides;
