import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import addHours from "date-fns/addHours";
import subHours from "date-fns/subHours";


export const addEventInfo = async (eventName, user, newEventId) => {
  console.log(newEventId)
    // Add a new document in collection "cities"
    await setDoc(doc(db, 'events', newEventId), {
      eventName: eventName,
      eventId: newEventId,
      ownerId: user.uid,
      ownerName: user.name,
      eventData: {
        groups: [{ id: 123, title: "jon" }],
        items: [
          {
            id: 1005,
            group: 'john',
            title: "item 1",
            start_time: subHours(new Date(), 12),
            end_time: addHours(new Date(), 12),
          },
        ],
      },
    });
  };

  /**
   * 
   *           defaultTimeStart={subHours(new Date(), 12)}
          defaultTimeEnd={addHours(new Date(), 12)}

   */