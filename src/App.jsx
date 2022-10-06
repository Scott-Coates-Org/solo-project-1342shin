import "./App.css";
import Login from "./components/login/Login";
import { Link } from "react-router-dom";
import { signOut, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { login, logout } from "./redux/authSlice";
import { db } from "./firebase/client";
import { IconButton, TextField } from "@mui/material";
import { collection, query } from "firebase/firestore";
import { loadEventsFromFirebase } from "./hooks/loadEventsFromFirebase";
import { addEventToUser } from "./hooks/addEventToUser";
import { addEventInfo } from "./hooks/addEventInfo";
import { nanoid } from "nanoid";
import background from "./assets/background.jpg";
import "./App.css";
import github from "./assets/github.png";
import linkedin from "./assets/linkedin.svg";
import email from "./assets/email.png";
import logo3 from "./assets/logo3.png";

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
        //console.log(user.displayName);
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
        //console.log("no user detected");
        signOut(auth);
        setUser(null);
        setEvents([]);
        dispatch(logout());
      }
    });
  }, [auth]);

  return (
    <div className="home">
      
      <img className="home-background-image" src={background} />
      <div className="home-top1">
        <img src={logo3} />
      </div>
      <div className="home-top2">
        <a
          id="github"
          href="https://github.com/Scott-Coates-Org/solo-project-1342shin"
          target="_blank"
          rel="noreferrer"
        >
          <img
            style={{ width: 28, margin: 5 }}
            src={github}
            alt="github icon"
          />
        </a>{" "}
        <a
          id="linkedin"
          href="https://www.linkedin.com/in/aahans"
          target="_blank"
          rel="noreferrer"
        >
          <img
            style={{ width: 28, margin: 3 }}
            src={linkedin}
            alt="linkedIn icon"
          />
        </a>{" "}
        <a id="mail" href="mailto:1542shin@gmail.com">
          <img style={{ width: 35, margin: 5 }} src={email} alt="email icon" />
        </a>
      </div>
      <div className="home-box">
        <div className="home-left">
          <div>
            <h1 id='l1'>Plan events with different timezones.</h1>
            <h3 id='l2'>You'll see everyone's availability on a single timeline converted to your timezone.</h3>
     <br/>
     <div id='howto'>
            <h3 id='l3'>* How to use</h3>
            <h3>1. Sign in & Make an event</h3>
            <h3>2. Add your availabitily on the timeline</h3>
            <h3>3. Share the link with other people</h3>
          </div></div>
        </div>
        <br />
        <div className="home-right">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Login userProp={user} />
          </div>

          <div>
            {user ? (
              <h1 id='l4'>Hi, {user.name}! <br/>This is your event list ↓</h1>
            ) : (
              <div>
                
              <h1>Sign in to start an event <br/> or see an example <br/>↓ </h1>
              <Link
                  className="link"
                  to={`/demo-path`}
                  key='demo'
                >
                  Mock Event
                </Link>
              </div>
            )}
          </div>

          <nav>
            {eventsLoaded &&
              events.map((event) => (
                <Link
                  className="link"
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
                    //console.log(newEventName);
                  }}
                >
                  <AddIcon id="plus"/>
                </IconButton>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;
