

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
      }
    }
  }