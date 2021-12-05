

export function commonStore2(){
    return {
      notes: [],
      value2:1,
      addNote(text){
        console.log(text, this.notes)
        this.notes.push(text)
      },
      showData(){
          console.log(this.notes);
      },
      increment(){
        this.value2 += 1;
        console.log(this.value2);
      },
      decrement(){
        this.value2 -= 1;
      }
    }
  }