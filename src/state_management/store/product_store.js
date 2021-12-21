import { makeAutoObservable } from "mobx";
import { apiGet, apiPostPut } from "../../resources/api_calls/api_methods";
import apiUrl from "../../resources/api_calls/api_urls";

class ProductStore {
  price = 1;
  showActiveProduct=false
  listProducts = [];
  loading = false;
  activeProductsList= []

  constructor() {
    makeAutoObservable(this);
  }

  setPrice() {
    this.price += 1;
    console.log(this.price);
  }

  addAndFetchedProductFromAPI = async () => {
    const response = await apiGet(apiUrl.fetchAllProducts);
    if(response.status===200){
      response.body.map(
        data=>this.listProducts.push(data)
        )        
    }
    
  };

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
    this.activeProductsList= this.listProducts.filter(el=>el.isActive===true)
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
    //  console.log(rideProd);
     return rideProd;

  }

  editProductInDB = async (uId,editedData) => {
    if (this.loading) {
      alert("loading Please wait..");
      return;
    }
    let body = {
      ...editedData
    };
    let path = `/product/products/${uId}`;
    this.loading = true;
    const resp = await apiPostPut(body, path, "PUT");
    this.loading = false;
    
    return resp.status


    };
    
    editProductLocalStore = async(uId,editedData) => {

      let dataToBeUpdate =this.getProdDetById(uId)
      const indexTobeEdited=this.listProducts.indexOf(dataToBeUpdate)
      this.listProducts[indexTobeEdited] = {...dataToBeUpdate,...editedData}
      
      const updateStatus =  this.editProductInDB(uId,editedData)
      if(updateStatus!==200){
        this.listProducts[indexTobeEdited] = {...dataToBeUpdate}
      }
            
  }

  setActiveProduct(){
    this.activeProductsList= this.listProducts.filter(el=>el.isActive===true)

  }
  
  getActiveProduct = () =>{
    if(this.showActiveProduct){
      return this.listProducts.filter((product) =>product.isActive===true)
    }
  }

  addProductToDataBase = async(body) =>{
    
    let path = `"/product/new-products"`;
    this.loading = true;
    const resp = await apiPostPut(body, path, "POST");
    this.loading = false;
    return resp.status
  
  }
  addProductToLocalStore = (body) =>{
    
    // this.listProducts.push(body)
    const len =this.listProducts.length
    this.listProducts[len] = body
    const updateStatus = this.addProductToDataBase(body)

    if (updateStatus !==200){
      this.listProducts.pop()
    }
  
  }


}

export default ProductStore;
