import { TimePicker } from "./TimePicker";
import React from 'react'
import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import { db } from "../firebase/client";

const save1=async()=>{
  try {
    const docRef = await addDoc(collection(db, "hi"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
const save2=async(userId)=>{
  try {
    const docRef = await setDoc(doc(db, "users", userId), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    });
    console.log("Document written with ID: ", docRef);

  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export const AddItem = () => {
  const [start, setStart] = React.useState(new Date())
  const [end, setEnd] = React.useState(new Date())
  const id='hello'
    return (
      <div>
        <TimePicker label='from' value={start} setTime={setStart} />
        <TimePicker label='to' value={end} setTime={setEnd}/>
       <button onClick={()=>save2(id)}>Add</button>
      </div>
    );
  };