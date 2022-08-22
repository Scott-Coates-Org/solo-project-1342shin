import "./App.css";
import Login from "./components/login/Login";
import { Calendar } from "./components/Calendar";
import { Outlet, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "./redux/authSlice";

import { logout } from "./redux/authSlice";

import { signOut } from "firebase/auth";

import { auth } from "./firebase/client";

function App() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);
  const events = [
    { id: 1, number: 1 },
    { id: "nFzpEu1lHcWLym95ZKo5", number: 2 },
    { id: "Sx5uTvRxJeBPfSEAeajB", number: 3 },
  ];
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("hi");
      console.log(user.uid);
      console.log("user is signed in");
    } else {
      console.log("no user detected");
      signOut(auth);
      dispatch(logout());
    }
  });

  return (
    <div className="App">
      <h1>Landing page</h1>
	  {console.log(authState)}
      <h1>{Object.values(authState)}</h1>
      <nav>
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>

      {authState.isLogged ? (
        <h1>Hi, this is your event list</h1>
      ) : (
        <h1>sign in to continue</h1>
      )}

      <Login />
      <div>
        <nav>
          {authState.isLogged &&
            events.map((event) => (
              <Link
                style={{ display: "block", margin: "1rem 0" }}
                to={`/${event.id}`}
                key={event.number}
              >
                {event.number}
              </Link>
            ))}
        </nav>
      </div>
    </div>
  );
}

export default App;
