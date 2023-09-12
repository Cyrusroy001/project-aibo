import React, { useState } from "react";
import "./PlannerPage.css";

import Navbar from "../../components/Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import Button from "../../components/Button/Button";
import Events from "../../components/Events/Events";
import Notification from "../../components/Notification/Notification";

import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";

function PlannerPage() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [dosage, setDosage] = useState("");
  const [notification, setNotification] = useState(null);

  const session = useSession(); // tokens
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  // no more flickering when we refresh the website
  if (isLoading) {
    return <></>;
  }

  // Close the notification
  const closeNotification = () => {
    setNotification(null);
  };

  async function signOut() {
    await supabase.auth.signOut();
    setNotification("Signed out successfully.");
  }

  async function createCalendarEvent() {
    // refill system -> reminder start date calculation
    const reminderDays = Number(duration) - 7; // 3 days before
    const date = new Date();
    const eventStart = date.getDate() + reminderDays;
    date.setDate(eventStart);
    console.log(eventStart);

    console.log("Creating calendar event");
    const event = {
      summary: "Refill for " + eventName,
      description: eventDescription + "," + reminderDays + "," + dosage,
      start: {
        dateTime: date.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: date.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };

    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data, err) => {
        console.log(data);
        console.log(err);
        setEventName("");
        setEventDescription("");
        setDuration("");
        setDosage("");
        setNotification("Reminder created on Google Calendar.");
      });
  }

  const isFormValid = () => {
    // Check if the required fields are not empty
    return (
      eventName.trim() !== "" &&
      eventDescription.trim() !== "" &&
      Number(duration.trim()) >= 7 &&
      Number(dosage.trim()) > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      createCalendarEvent();
    } else {
      setNotification("Please insert valid input.");
    }
  };

  return (
    <div className="planner-page">
      {session ? (
        <>
          <Navbar />
          <Button label="Sign Out" callback={signOut} />

          <div className="content">
            <div className="left-column">
              <Events />
            </div>

            <div className="input right-column">
              <form>
                <div className="form-title">Medicine Reminder</div>
                <div className="details-picker">
                  <input
                    id="pillName"
                    type="text"
                    placeholder="Pill name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    autoComplete="off"
                    required
                  />
                </div>
              </form>

              <div className="details-picker">
                <input
                  id="eventDesc"
                  type="text"
                  placeholder="Description"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="details-picker">
                <input
                  id="duration"
                  type="text"
                  placeholder="Duration (number > 7)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="details-picker">
                <input
                  id="dosage"
                  type="text"
                  placeholder="Dosage per day (number)"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  autoComplete="off"
                  required
                />
              </div>

              <hr />

              <Button
                label="Set Refill Reminder"
                type="submit"
                callback={handleSubmit}
              />
            </div>
          </div>
        </>
      ) : (
        <HomePage />
      )}
      {notification && (
        <Notification message={notification} onClose={closeNotification} />
      )}
    </div>
  );
}

export default PlannerPage;
