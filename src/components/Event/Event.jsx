import React, {useState} from "react";
import { useDispatch } from "react-redux";
import setProgress from "../../actions/usericonAction";
import "./Event.css";
import { useSession, useSessionContext } from "@supabase/auth-helpers-react";
import Notification from "../Notification/Notification";

function Event({ event }) {
  const [notification, setNotification] = useState(null);
  const dispatch = useDispatch();
  const session = useSession(); // tokens
  const { isLoading } = useSessionContext();

  // no more flickering when we refresh the website
  if (isLoading) {
    return <></>;
  }

  // Close the notification
  const closeNotification = () => {
    setNotification(null);
  };

  // dynamic changing
  let remainingDays = event.description.split(",")[1];
  console.log(remainingDays);

  async function deleteCalendarEvent() {
    const eventId = event.id;
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events/" +
        eventId,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
      }
    ).then((data) => {
      console.log(data);
      dispatch(setProgress());
      setNotification("Calendar event deleted.");
    });
  }

  return (
    <div>
      <div class="card">
        <div class="card-header">
          <span>{event.summary}</span>
          <button
            className="task-done"
            onClick={() => {
              deleteCalendarEvent();
            }}
          >
            Done
          </button>
        </div>
        <div class="card-body">
          {remainingDays + 7}
          {remainingDays > 1 ? <span> days left</span> : <span> day left</span>}
        </div>
      </div>
      {notification && (
        <Notification message={notification} onClose={closeNotification} />
      )}
    </div>
  );
}

export default Event;
