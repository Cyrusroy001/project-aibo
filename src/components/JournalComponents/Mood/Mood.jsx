import React from "react";
import "./Mood.css";

function Mood({ day, mood }) {
  let moodColor;

  if (mood < 3) {
    moodColor = "green";
  } else if (mood >= 3 && mood < 7) {
    moodColor = "orange";
  } else {
    moodColor = "red";
  }

  return (
    <div className="mood">
      <div className={`mood-circle ${moodColor}`}></div>
      <div className="day">{day.substr(0, 3)}</div>
    </div>
  );
}

export default Mood;
