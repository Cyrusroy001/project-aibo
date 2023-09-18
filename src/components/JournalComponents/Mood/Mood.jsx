import React from "react";
import "./Mood.css";

function Mood({ date, mood }) {
  let moodColor;

  if (mood < 3) {
    moodColor = "red";
  } else if (mood >= 3 && mood < 7) {
    moodColor = "orange";
  } else {
    moodColor = "green";
  }

  return (
    <div className="mood">
      <div className={`mood-circle ${moodColor} tooltip`}>
        <span class="tooltiptext">Score: {mood.toFixed(2)}</span>
      </div>
      <div className="day">{date.substr(0, 3)}</div>
    </div>
  );
}

export default Mood;
