import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];

  const [notes, setNotes] = useState(noteInitial);

  //Get all Notes
  const getAllNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/note/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/note/addNote`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };

  // Delete Note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/note/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json)


    //Delete note logic
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(
      `${host}/api/note/updateNote/${id}`,
      {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    const json = await response.json();
    console.log(json)

    const newNotes  = JSON.parse(JSON.stringify(notes))
    //Edit note logic
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, deleteNote, addNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
