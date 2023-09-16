import React, { useState } from "react";
import "./AddNote.css";
import Button from "../../Button/Button";
import MoodSummary from "../MoodSummary/MoodSummary";

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 300;

  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0)
      setNoteText(event.target.value);
    else console.log("Character limit reached");
  };

  const handleSaveClick = (event) => {
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
    }
    setNoteText("");
    event.preventDefault();
  };

  return (
    <div className="new-note-container">
      <MoodSummary />
      <div className="journal-page-header">
        Embrace Your Emotions with aibo Notes
      </div>
      <div className="new-note">
        <textarea
          placeholder="Tell me about your day..."
          rows="10"
          cols="10"
          value={noteText}
          onChange={handleChange}
        ></textarea>
        <div className="note-footer">
          <small>{characterLimit - noteText.length} Characters Remaining</small>
          <Button
            className="save-button"
            label="Save"
            callback={handleSaveClick}
          />
        </div>
      </div>
    </div>
  );
};

export default AddNote;
