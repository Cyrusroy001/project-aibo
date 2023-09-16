import React from "react";
import "./MoodSummary.css";
import Mood from "../Mood/Mood";

const moods = [
  {
    day: "Sunday",
    mood: 1.7,
  },
  {
    day: "Monday",
    mood: 6.7,
  },
  {
    day: "Tuesday",
    mood: 8.9,
  },
  {
    day: "Wednesday",
    mood: 2.4,
  },
  {
    day: "Thrusday",
    mood: 3.4,
  },
  {
    day: "Friday",
    mood: 5,
  },
  {
    day: "Saturday",
    mood: 9.6,
  },
];

function MoodSummary() {
  return (
    <div className="moods-container">
      <div className="moods">
        {moods.map((moodData, index) => (
          <Mood key={index} day={moodData.day} mood={moodData.mood} />
        ))}
      </div>
    </div>
  );
}

export default MoodSummary;
