import { nanoid } from "@reduxjs/toolkit";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/client";

// Create an initial document to update.

export const addTimeItem = async (eventId, userId,startTime,endTime) => {
  try {
    const eventDocRef = doc(db, "events", eventId);
    // Atomically add a new region to the "regions" array field.
    console.dir(startTime)
    await updateDoc(eventDocRef, {
      "eventData.items": arrayUnion({
        id: nanoid(),
        group: userId,
        start_time: startTime,
        end_time: endTime,
    
      }),
    });
    console.log("Document written with ID: ", eventDocRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};