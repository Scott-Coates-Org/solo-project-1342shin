import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import { TimePicker } from "./TimePicker";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, addDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { login, logout, selectAuth } from "../redux/authSlice";
import { signOut } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import moment from "moment";
import React from "react";
import { addTimeItem } from "../hooks/addTimeItem";
import Login from "./login/Login";
import { addGroup } from "../hooks/addGroup";
import { ConvertToMoment } from "../hooks/convertToMoment";
import { ClickedItemDialog } from "./ClickedItemDialog";
import Button from "@mui/material/Button";
import { HomeButon } from "./HomeButton";
import AddIcon from "@mui/icons-material/Add";
import "./calendar.css";
import background from "../assets/background.jpg";
import { nanoid } from "@reduxjs/toolkit";

export const Demo = () => {
  const [status, setStatus] = useState("loading");
  const [eventData, setEventData] = useState({});
  const [momentItems, setMomentItems] = useState([]);
  const [startTime, setStartTime] = React.useState(moment());
  const [endTime, setEndTime] = React.useState(moment());
  const [user, setUser] = useState(null);
  const [timezone, setTimezone] = useState("");
  const [groups, setGroups] = useState([
    { id: 1, title: "Elon Musk" },
    { id: 2, title: "PSY" },
    { id: 3, title: "Gandhi  " },
    { id: 4, title: "Aahan Shin" },
  ]);
  const [items, setItems] = useState([
    {
      id: 2,
      group: 1,

      start_time: moment().add(-5.5, "hour"),
      end_time: moment().add(-3.5, "hour"),
    },
    {
      id: 3,
      group: 1,
      start_time: moment().add(2, "hour"),
      end_time: moment().add(3, "hour"),
    },
    {
      id: 4,
      group: 2,
      start_time: moment().add(2.5, "hour"),
      end_time: moment().add(7, "hour"),
    },
    {
      id: 5,
      group: 2,
      start_time: moment().add(-2, "hour"),
      end_time: moment().add(1, "hour"),
    },
    {
      id: 6,
      group: 2,
      start_time: moment().add(-10, "hour"),
      end_time: moment().add(-7, "hour"),
    },
    {
      id: 7,
      group: 3,
      start_time: moment().add(-12, "hour"),
      end_time: moment().add(-9, "hour"),
    },
    ,
    {
      id: 8,
      group: 3,
      start_time: moment().add(-6, "hour"),
      end_time: moment().add(-3, "hour"),
    },
    ,
    {
      id: 9,
      group: 3,
      start_time: moment().add(2, "hour"),
      end_time: moment().add(3, "hour"),
    },
    ,
    {
      id: 10,
      group: 4,
      start_time: moment().add(-3, "hour"),
      end_time: moment().add(-1, "hour"),
    },
    ,
    {
      id: 11,
      group: 4,
      start_time: moment().add(4, "hour"),
      end_time: moment().add(7, "hour"),
    },
  ]);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = useState({ itemId: "", e: "", time: "" });
  const dispatch = useDispatch();
  let params = useParams();
  const eventId = params.eventId;
  const auth = getAuth();

  const onItemSelect = (itemId, e, time) => {
    //console.log(itemId, e, time);
    setOpen(true);
    setSelected({ itemId: itemId, e: e, time: time });
  };

  const checkDocument = async () => {
    try {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        //console.log("Document data:", docSnap.data());
        let items = docSnap.data().eventData.items;
        if (items.length) {
          let momentItems = ConvertToMoment(items);
          setMomentItems(momentItems);
        }

        setEventData(docSnap.data());
        //console.log(eventData);
        setStatus("ok");
      } else {
        // doc.data() will be undefined in this case
        //console.log("No such document!");
        setStatus("na");
      }
    } catch (e) {
      //console.log(e);
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
        //console.log("no user detected");
        signOut(auth);
        setUser(null);
        dispatch(logout());
      }
    });
  }, [auth]);

  return (
    <div>
      <img className="home-background-image" src={background} />
      <div id="calendar">
        <div className="calendar-top">
          <HomeButon className="homebutton" />
        </div>
        <h1 id="title">'New Year Party' by Aahan Shin</h1>

        {user && (
          <h1 id="hi">
            Hi, {user.name}! Add your availability and share the link with other
            people.
          </h1>
        )}
        <h2>Your Timezone : {timezone} </h2>

        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-12, "hour")}
          defaultTimeEnd={moment().add(12, "hour")}
        />

        <ClickedItemDialog
          onClose={() => {
            setOpen(false);
          }}
          open={open}
          selected={selected}
          setSelected={setSelected}
          eventData={eventData}
          user={user}
        />

        <div>
          <div id="timewrap">
            <TimePicker label="from" value={startTime} setTime={setStartTime} />
            <TimePicker label="to" value={endTime} setTime={setEndTime} />

            <Button
              aria-label="add"
              color="secondary"
              disabled={!user}
              variant="outlined"
              onClick={() => {
                setItems([
                  ...items,
                  {
                    id: nanoid(),
                    group: 34,
                    title: "title",
                    start_time: moment().add(2, "hour"),
                    end_time: moment().add(3, "hour"),
                  },
                ]);
                setGroups([...groups, { id: 34, title: "group 34" }]);
              }}
            >
              <AddIcon fontSize="large" />
              Add time
            </Button>
          </div><div id='zoom'>
          <h2>
            (For Laptop: Use trackpad to zoom in/out and scroll horizontally)
          </h2>
          <h2>
            (For Desktop: Hold Control or Command + scroll mouse wheel to zoom
            in/out. Click and drag to scroll horizontally)
          </h2></div>
        </div>
      </div>
    </div>
  );
};
