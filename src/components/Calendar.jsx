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
import { addTimeItem } from "../hooks/addTimeItem";
import Login from "./login/Login";
import { addGroup } from "../hooks/addGroup";
import { ConvertToMoment } from "../hooks/convertToMoment";
import { addOnItemSelect } from "../hooks/addOnItemSelect";
import { ClickedItemDialog } from "./ClickedItemDialog";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import Stack from "@mui/material/Stack";
import { HomeButon } from "./HomeButton";
import AddIcon from "@mui/icons-material/Add";

import { IconButton, InputAdornment } from "@mui/material";


export const Calendar = () => {
  //const groups = useSelector(selectGroups);
  // const items = useSelector(selectItems);
  const [status, setStatus] = useState("loading");
  const [eventData, setEventData] = useState({});
  const [momentItems, setMomentItems] = useState([]);
  const [startTime, setStartTime] = React.useState(moment());
  const [endTime, setEndTime] = React.useState(moment());
  const [user, setUser] = useState(null);
  const [timezone, setTimezone] = useState("");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState({ itemId: "", e: "", time: "" });
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);
  let params = useParams();
  const eventId = params.eventId;
  const auth = getAuth();

  const onItemSelect = (itemId, e, time) => {
    console.log(itemId, e, time);
    setOpen(true);
    setSelected({ itemId: itemId, e: e, time: time });
  };

  const checkDocument = async () => {
    try {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let items = docSnap.data().eventData.items;
        if (items.length) {
          let momentItems = ConvertToMoment(items);
          //addOnItemSelect(momentItems);
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
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);

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
      let items = doc.data().eventData.items;
      console.log(items);
      if (items.length) {
        let momentItems = ConvertToMoment(items);
        //addOnItemSelect(momentItems);
        console.log(momentItems);
        setMomentItems(momentItems);
      }
      else{
        setMomentItems([]);

      }
      setEventData(doc.data());
    });
  }, [auth]);

  if (status == "loading")
    return (
      <div style={{ margin: 20 }}>
        <HomeButon />

        <h1>loading..</h1>
      </div>
    );
  else if (status == "ok")
    return (
      <div>
        <div style={{ margin: 20 }}>
          <HomeButon />
        </div>
        <Login userProp={user} />
        <h1>Event Name: {eventData.eventName}</h1>
        <h1>Event Holder: {eventData.ownerName}</h1>
        <br />
        {user && <h1>Hi, {user.name}. Add your availability and share the link</h1>}
        <h1>Your Timezone : {timezone} </h1>
        <Timeline
          groups={eventData.eventData.groups}
          items={momentItems}
          defaultTimeStart={moment().add(-12, "hour")}
          defaultTimeEnd={moment().add(12, "hour")}
          onItemSelect={onItemSelect}
        />

        <ClickedItemDialog
          onClose={() => {
            setOpen(false);
          }}
          open={open}
          selected={selected}
          setSelected={setSelected}
          eventData={eventData}
        />
        <div>
          <div>
            <TimePicker label="from" value={startTime} setTime={setStartTime} />
            <TimePicker label="to" value={endTime} setTime={setEndTime} />
            
            <Button aria-label="add" color="secondary"  disabled={!user}
            style={{ marginLeft: 30 }}
            onClick={() => {
              addTimeItem(
                eventData.eventId,
                user.uid,
                startTime.format("MMMM Do YYYY, h:mm:ss a Z"),
                endTime.format("MMMM Do YYYY, h:mm:ss a Z")
              );
              addGroup(eventId, user);
            }}>
        <AddIcon fontSize="large"/>Add Availability
      </Button>
            
          </div>
        </div>
      </div>
    );
  else
    return (
      <div>
        <HomeButon />
        <h1>wrong page</h1>
      </div>
    );
};
