import { getDocs } from "firebase/firestore";

export const loadEventsFromFirebase = async (q, setEvents, setEventsLoaded) => {
    setEvents([]);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setEvents((prevState) => [...prevState, doc.data()]);
      ////console.log(doc.id, " => ", doc.data());
    });
    setEventsLoaded(true);
  };