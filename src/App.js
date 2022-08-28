import "./App.css";
import Login from "./components/login/Login";
import {  Link } from "react-router-dom";
import { signOut,getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { login, logout } from "./redux/authSlice";
import { db } from "./firebase/client";
import { IconButton, TextField } from "@mui/material";
import { collection, query } from "firebase/firestore";
import { loadEventsFromFirebase } from "./loadEventsFromFirebase";
import { addEventToUser } from "./addEventToUser";
import { addEventInfo } from "./addEventInfo";
import { nanoid } from "nanoid";


function App() {
  const [user, setUser] = useState(null);
  const [newEventName, setNewEventName] = useState("");
  const [events, setEvents] = useState([]);
  const [newEventId, setNewEventId] = useState('');
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
        dispatch(logout());
      }
    });
  }, [auth]);

  return (
    <div className="App">
      <h1>Landing page</h1>
      <nav>
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>

      {user ? (
        <h1>Hi, {user.name} this is your event list</h1>
      ) : (
        <h1>sign in to continue</h1>
      )}

      <Login userProp={user} />

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
              aria-label="add"
              onClick={() => {
                const randomId=nanoid()
               setNewEventId(randomId)

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
