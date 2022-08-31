import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
//import { Timeline } from "vis-timeline/standalone";
import { TimePicker } from "./TimePicker";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { login, logout, selectAuth } from "../redux/authSlice";
import { signOut } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { addTimeItem } from "../addTimeItem";
import Login from "./login/Login";
import { addGroup } from "../addGroup";

export const Calendar = () => {
  //const groups = useSelector(selectGroups);
  // const items = useSelector(selectItems);
  const [status, setStatus] = useState("loading");
  const [eventData, setEventData] = useState({});
  const [momentItems, setMomentItems] = useState([]);
  const [startTime, setStartTime] = React.useState(moment());
  const [endTime, setEndTime] = React.useState(moment());
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);
  let params = useParams();
  const eventId = params.eventId;
  const auth = getAuth();

  const checkDocument = async () => {
    try {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        console.log("Document data:", docSnap.data());
        if (docSnap.data().eventData.items.length) {
          let momentItems = docSnap.data().eventData.items.map((item) => {
            let startTime = moment(item.start_time, "MMMM Do YYYY, h:mm:ss a");
            let endTime = moment(item.end_time, "MMMM Do YYYY, h:mm:ss a");
            return {
              id: item.id,
              group: item.group,
              start_time: startTime,
              end_time: endTime,
            };
          });
          setMomentItems(momentItems);
        }

        setEventData(docSnap.data());
        console.log(eventData);
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
    checkDocument();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        setUser({ name: user.displayName, email: user.email, uid: user.uid });

        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            accessToken: user.accessToken,
          })
        );

       // addGroup(eventId,user)
      } else {
        console.log("no user detected");
        signOut(auth);
        setUser(null);
        dispatch(logout());
      }
    });
    console.log(eventData);

    //litsen for update
    const unsub = onSnapshot(doc(db, "events", eventId), (doc) => {
      console.log(doc.data());
      setEventData(doc.data());
      console.log(eventData);
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
        <Login userProp={user} />
        {user && <h1>Hi "{user.name}"</h1>}
        <h1>Event Name: {eventData.eventName}</h1>
        <h1>Event Holder: {eventData.ownerName}</h1>
        <Timeline
          groups={eventData.eventData.groups}
          items={momentItems}
          defaultTimeStart={moment().add(-12, "hour")}
          defaultTimeEnd={moment().add(12, "hour")}
        />
        <div>
          <div>
            <TimePicker label="from" value={startTime} setTime={setStartTime} />
            <TimePicker label="to" value={endTime} setTime={setEndTime} />
            <button
              disabled={!user}
              onClick={() =>{
                addTimeItem(
                  eventData.eventId,
                  user.uid,
                  startTime.format("MMMM Do YYYY, h:mm:ss a"),
                  endTime.format("MMMM Do YYYY, h:mm:ss a")
                )
                addGroup(eventId,user)}
              }
            >
              Add
            </button>
          </div>
        </div>
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
