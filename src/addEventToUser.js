import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase/client";
import { nanoid } from "nanoid";
import { collection, query, where, getDocs } from "firebase/firestore";
import addHours from "date-fns/addHours";
import subHours from "date-fns/subHours";


export const addEventToUser = async (eventName, user, newEventId) => {
    // Add a new document in collection 
    await setDoc(doc(db, user.name, newEventId), {
      eventName: eventName,
      eventId: newEventId,
      ownerId: user.uid,
      ownerName: user.name,
    });
  };