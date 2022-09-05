import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/client";

export const addEventInfo = async (eventName, user, newEventId) => {
  //console.log(newEventId)
    // Add a new document in collection "cities"
    await setDoc(doc(db, 'events', newEventId), {
      eventName: eventName,
      eventId: newEventId,
      ownerId: user.uid,
      ownerName: user.name,
      eventData: {
        groups: [{ id: user.uid, title: user.name },],
        items:[]
      }
    });

  };
