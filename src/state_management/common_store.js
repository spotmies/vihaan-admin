
import apiUrls from "../resources/api_calls/api_urls";
import { apiGet } from "../resources/api_calls/api_methods";

export function commonStore(){
    return {
      notes: [],
      value:1,
      addNote(text){
        console.log(text, this.notes)
        this.notes.push(text)
      },
      showData(){
          console.log(this.notes);
      },
      increment(){
        this.value += 1;
        console.log(this.value);
      },
      decrement(){
        this.value -= 1;
      },
      async fetchAllProductsFromDB(){
        const response = await apiGet(apiUrls.fetchAllProducts)
        
        console.log("response",response)
        this.value += response.body.length;
      }

    }
  }