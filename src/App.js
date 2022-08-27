import "./App.css";
import Login from "./components/login/Login";
import { Calendar } from "./components/Calendar";
import { Outlet, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { login, logout } from "./redux/authSlice";
import { db } from "./firebase/client";

import { signOut } from "firebase/auth";
import { nanoid } from "nanoid";
import { auth } from "./firebase/client";
import { IconButton, TextField } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";

import { collection, query, where, getDocs } from "firebase/firestore";

const loadEventsFromFirebase = async (q,setEvents,setEventsLoaded) => {
  setEvents([])
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    setEvents((prevState)=>[...prevState, doc.data()])
    console.log(doc.id, " => ", doc.data());
  });
  setEventsLoaded(true)

};

const addDocToFirebase = async (eventName, user) => {
  const randomId=nanoid()
  // Add a new document in collection "cities"
  await setDoc(doc(db, user.name, randomId), {
    eventName: eventName,
    eventId: randomId,
    ownerId: user.uid,
    ownerName: user.name,
    items: {
      //guest example
      "jone doe": {
        guestName: "john moe",
        guestId: "32f3fc9",
        time: {},
      },
    },
  });
};

function App() {
  const [user, setUser] = useState(null);
  const [newEventName, setNewEventName] = useState("");
  const [events, setEvents] = useState([]);
  const [eventsLoaded,setEventsLoaded]=useState(false)
  const dispatch = useDispatch();

  // const events = [
  //   { id: 1, number: 1 },
  //   { id: "nFzpEu1lHcWLym95ZKo5", number: 2 },
  //   { id: "Sx5uTvRxJeBPfSEAeajB", number: 3 },
  // ];
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUser({ name: user.displayName, email: user.email, uid: user.uid });
        console.log( user.displayName);
        const q = query(collection(db, user.displayName));
        loadEventsFromFirebase(q,setEvents,setEventsLoaded);
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            accessToken: user.accessToken,
          }),
        )

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
                addDocToFirebase(newEventName, user);
                const q = query(collection(db, user.name));
                loadEventsFromFirebase(q,setEvents,setEventsLoaded);
                setNewEventName('')
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