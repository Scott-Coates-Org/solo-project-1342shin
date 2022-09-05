import "./App.css";
import Login from "./components/login/Login";
import { Link } from "react-router-dom";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { login, logout } from "./redux/authSlice";
import { db } from "./firebase/client";
import { IconButton, TextField } from "@mui/material";
import { collection, query } from "firebase/firestore";
import { loadEventsFromFirebase } from "./hooks/loadEventsFromFirebase";
import { addEventToUser } from "./hooks/addEventToUser";
import { addEventInfo } from "./hooks/addEventInfo";
import { nanoid } from "nanoid";

import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled

function App() {
  const [user, setUser] = useState(null);
  const [newEventName, setNewEventName] = useState("");
  const [events, setEvents] = useState([]);
  const [newEventId, setNewEventId] = useState("");
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser({ name: user.displayName, email: user.email, uid: user.uid });
        console.log(user.displayName);
        const q = query(collection(db, user.displayName));
        loadEventsFromFirebase(q, setEvents, setEventsLoaded);
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
        setEvents([]);
        dispatch(logout());
      }
    });
  }, [auth]);

  return (
    <div className="App">
      {/**  <h1>Landing page</h1>
      <nav>
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>*/}
      <div>
        <h2>
          Timezone Planner helps you to plan events with people in different
          timezones.
        </h2>
        <h2>You can see everyone's time availability on the timeline,</h2>
        <h2>automatically converted to your timezone.</h2>
      </div>
      <div>
        <h3>* How to use the app</h3>
        <h3>1. Make an event</h3>
        <h3>2. Add your availabitily on the timeline</h3>
        <h3>3. Share the link with other people</h3>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Login userProp={user} />
      </div>

      <div>
        {user ? (
          <h1>Hi, {user.name}! This is your event list ↓</h1>
        ) : (
          <h1>Sign in to make an event</h1>
        )}
      </div>

      <nav>
        {eventsLoaded &&
          events.map((event) => (
            <Link
              style={{ display: "block", margin: "1rem 0" }}
              to={`/${event.eventId}`}
              key={event.eventName}
            >
              {event.eventName}
            </Link>
          ))}
        {user && (
          <div>
            <TextField
              required
              id="outlined-required"
              label="New Event Name"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
            />

            <IconButton
              disabled={!newEventName}
              aria-label="add"
              onClick={() => {
                const randomId = nanoid();
                setNewEventId(randomId);

                addEventToUser(newEventName, user, randomId);
                addEventInfo(newEventName, user, randomId);
                const q = query(collection(db, user.name));
                loadEventsFromFirebase(q, setEvents, setEventsLoaded);
                setNewEventName("");
                console.log(newEventName);
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
        )}
      </nav>
    </div>
  );
}

export default App;
