import { nanoid } from "@reduxjs/toolkit";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/client";


const filterItemArr=(eventData,timeId)=>{

    return eventData.eventData.items.filter((item)=>item.id===timeId)

}

export const removeTimeItem = async (eventData, timeId, setSelected) => {
  try {
    let filteredItem=filterItemArr(eventData,timeId)[0]
    const eventDocRef = doc(db, "events", eventData.eventId);
    // Atomically add a new region to the "regions" array field.
    await updateDoc(eventDocRef, {
      "eventData.items": arrayRemove({
        
        id: filteredItem.id,
        group:filteredItem.group,
        start_time:filteredItem.start_time,
        end_time:filteredItem.end_time,
       
    
      }),
    });
    setSelected({ itemId: '', e: '', time: '' })
    //console.log("Document removed with ID: ", eventDocRef);

  } catch (e) {
    console.error("Error removing document: ", e);
  }
};