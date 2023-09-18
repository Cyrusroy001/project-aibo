import React, { useEffect, useState } from "react";
import "./MoodSummary.css";
import Mood from "../Mood/Mood";

function MoodSummary({notes}) {
  const [trackerData, setTrackerData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the JSON file from the public folder
        const response = await fetch("http://127.0.0.1:5000/read_tracker");
        const data = await response.json();
        console.log("data: ", data);
        setTrackerData(data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    // Fetch data initially when the component mounts
    fetchData();
  }, [notes]);

  const dates = [];
  const scores = [];
  for (const key in trackerData) {
    if (trackerData.hasOwnProperty(key)) {
      dates.push(key);
      scores.push(trackerData[key]);
    }
  }
  console.log("dates: ", dates);
  console.log("scores: ", scores);

    // // Convert JSON object into an array of key-value pairs
    // const dataArray = Object.entries(trackerData);

    // // Parse the date strings into JavaScript Date objects and sort them
    // const sortedArray = dataArray
    //   .map(([dateString, value]) => ({
    //     date: new Date(dateString),
    //     value,
    //   }))
    //   .sort((a, b) => a.date - b.date);
    // console.log("daorted: ", sortedArray);

  return (
    <div className="moods-container">
      <div className="moods">
        {scores.map((score, index) => (
          <Mood key={index} date={dates[index]} mood={score} />
        ))}
      </div>
    </div>
  );
}

export default MoodSummary;
