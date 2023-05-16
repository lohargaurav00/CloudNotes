import React, { useContext } from "react";
import noteContext from "../context/Notes/noteContext";

function NoteItems(props) {
  const { notes, updateNote } = props;
  const Context = useContext(noteContext);
  const { deleteNote } = Context;

  const handleDeleteNote = () => {
    deleteNote(notes._id);
    props.show_alert("Your note deleted successfully", "success")
  };
  return (
    <>
      <div className="col-md-3 my-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{notes.title}</h5>
            <hr />
            <p className="card-text">{notes.description}</p>
            <i
              className="fa-solid fa-trash mx-2"
              onClick={handleDeleteNote}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                updateNote(notes);
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteItems;
