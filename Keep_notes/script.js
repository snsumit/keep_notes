const addBtn = document.querySelector("#addNote");
const allNotes = document.querySelector(".AllNotes");

const updateLSData = () =>{
  const textAreaValue = document.querySelectorAll("textarea");
  const notes = [];
  textAreaValue.forEach((note)=>{
    return notes.push(note.value);
  })
  localStorage.setItem('notes',JSON.stringify(notes));

}


const addNewNote = (text = "") =>{
  const note = document.createElement('div');
  note.className ="note";
  const htmldata =` <div class="operations">
  <button class="editbtn"><i class="fas fa-edit"></i></button>
  <button class="deletebtn"><i class="fas fa-trash-alt"></i></button>
 </div>
 <div class="main ${text ? "":"hidden"}"></div>
 <textarea class="${text ? "hidden" : ""}"></textarea>
 `
 note.insertAdjacentHTML("afterbegin",htmldata)
 allNotes.append(note)

  const removeNote = note.querySelector('.deletebtn');
  
  const editNote  = note.querySelector(".editbtn");
  const maindiv = note.querySelector('.main');
  const textarea = note.querySelector("textarea")

  textarea.value = text;
  maindiv.innerText = text;

  editNote.addEventListener('click',()=>{
       maindiv.classList.toggle("hidden")
       textarea.classList.toggle("hidden");
  })

  textarea.addEventListener("change",(event)=>{
     const value = event.target.value;
     maindiv.innerText = value;
     updateLSData();
  })
  
  
  removeNote.addEventListener('click',()=>{ 
   note.remove();
   updateLSData();
  })


 
}

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
  notes.forEach((note)=>{
   addNewNote(note)
  })
}


addBtn.addEventListener('click',()=>{ addNewNote() })
