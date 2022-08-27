import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";

//import { Timeline } from "vis-timeline/standalone";
import { TimePicker } from "./TimePicker";
import addHours from "date-fns/addHours";
import subHours from "date-fns/subHours";
import { selectGroups } from "../redux/groupsSlice";
import { selectItems } from "../redux/itemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddItem } from "./AddItem";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { login, logout, selectAuth } from "../redux/authSlice";

import { signOut } from "firebase/auth";
import {  onSnapshot } from "firebase/firestore";

//make redux store with username, event name, event id

export const Calendar = () => {
  const groups = useSelector(selectGroups);
  const items = useSelector(selectItems);
  const [status, setStatus] = useState("loading");
  const [eventData, setEventData]=useState({})

  const dispatch = useDispatch();

  const authState = useSelector(selectAuth);

  let params = useParams();
  const eventId = params.eventId;

  const auth = getAuth();
  const checkDocument = async () => {
    try {
      const docRef = doc(db, authState.user, eventId);
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
  useEffect(() => {
    console.log(authState);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            accessToken: user.accessToken,
          })
        );
      } else {
        console.log("no user detected");
        signOut(auth);
        //setUser(null);
        dispatch(logout());
      }
    });

    checkDocument();
    const unsub = onSnapshot(doc(db, authState.user, eventId), (doc) => {
      console.log("Current data: ", doc.data());
      setEventData(doc.data())
  });
  
  }, [auth]);

  if (status == "loading")
    return (
      <div>
        <Link to="/">HOME</Link>
        <h1>loading..</h1>
      </div>
    );
  else if (status == "ok")
    return (
      <div>
        <Link to="/">HOME</Link>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={subHours(new Date(), 12)}
          defaultTimeEnd={addHours(new Date(), 12)}
        />
        <AddItem />
      </div>
    );
  else
    return (
      <div>
        <Link to="/">HOME</Link>
        <h1>wrong page</h1>
      </div>
    );
};
