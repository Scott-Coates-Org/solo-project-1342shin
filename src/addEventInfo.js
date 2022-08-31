import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase/client";
import { collection, query, where, getDocs } from "firebase/firestore";
import addHours from "date-fns/addHours";
import subHours from "date-fns/subHours";
import moment from "moment";



const time={
  items: [
    {
      id: 1,
      group: 1,
      title: "item 1",
      start_time: moment().format('MMMM Do YYYY, h:mm:ss a'),
      end_time: moment().add(1, "hour").format('MMMM Do YYYY, h:mm:ss a'),
    },

    {
      id: 3,
      group: 1,
      title: "item 3",
      start_time: moment().add(2, "hour").format('MMMM Do YYYY, h:mm:ss a'),
      end_time: moment().add(3, "hour").format('MMMM Do YYYY, h:mm:ss a'),
    },
  ],
  groups: [
    { id: 1, title: "group 1" },
    { id: 2, title: "group 2" },
  ],
}

export const addEventInfo = async (eventName, user, newEventId) => {
  console.log(newEventId)
    // Add a new document in collection "cities"
  
    await setDoc(doc(db, 'events', newEventId), {
      eventName: eventName,
      eventId: newEventId,
      ownerId: user.uid,
      ownerName: user.name,
      eventData: {
        groups: [{ id: user.uid, title: user.name },]
      }
    });

  };
