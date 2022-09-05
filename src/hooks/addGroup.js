import { nanoid } from "@reduxjs/toolkit";
import { doc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase/client";

// Create an initial document to update.

export const addGroup = async (eventId, user) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await setDoc(
      eventRef,
      {
        eventData: {
          groups: arrayUnion({
            id: user.uid,
            title: user.name,
          }),
        },
      },
      { merge: true }
    );

    console.log("Group added with username: ", user.userId);
  } catch (e) {
    console.error("Error adding group: ", e);
  }
};
