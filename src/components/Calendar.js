import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";

//import { Timeline } from "vis-timeline/standalone";
import { TimePicker } from "./TimePicker";
import addHours from "date-fns/addHours";
import subHours from "date-fns/subHours";
import { selectGroups } from "../redux/groupsSlice";
import { selectItems } from "../redux/itemsSlice";
import { useSelector } from "react-redux";
import { AddItem } from "./AddItem";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { selectAuth } from "../redux/authSlice";

const func = () => {
  
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("signed in");
    } else {
      // User is signed out
      // ...
      console.log("no sign in");
    }
  });
};

const func2 = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...

    console.log(user);
  } else {
    // No user is signed in.
  }
};

const func3 = async () => {
  const docRef = doc(db, "users", "Sx5uTvRxJeBPfSEAeajB");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const Calendar = () => {
  const groups = useSelector(selectGroups);
  const items = useSelector(selectItems);
  const [status, setStatus] = useState("loading");
  const authState=useSelector(selectAuth)

  let params = useParams();
  const eventId = params.eventId;
  useEffect(() => {
    const func4 = async () => {
      try {
        const docRef = doc(db, "users", eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setStatus("ok");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setStatus("na");
        }
      } catch (e) {
        console.log(e);
      }
    };
    func4();
  }, []);

  if (status == "loading")
    return (
      <div>
        <Link to="/"  >HOME</Link>
        <h1>loading..</h1>
      </div>
    );
  else if (status == "ok")
    return (
      <div>
        <Link to="/"  >HOME</Link>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={subHours(new Date(), 12)}
          defaultTimeEnd={addHours(new Date(), 12)}
        />
        <AddItem />
        <button onClick={func}>func</button>
        <button onClick={func2}>func2</button>
        <button onClick={func3}>func3</button>
      </div>
    );
  else return (
    <div>
      <Link to="/" >HOME</Link>
      <h1>wrong page</h1>
    </div>
  );
};
