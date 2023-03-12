const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchuser");
const user = require("../models/Users");
const { body, validationResult } = require("express-validator");

//Route 1 : Fetching all user notes: Get "api/note/fetchAllNotes login required"

router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const notes = await Notes.find({ user: userId });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 2 : Add a user notes: Post "api/note/addNote login required"
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "title should be lower than 30 characters").isLength({
      max: 20,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const noteSave = await note.save();
      res.json(noteSave);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3 : update an existing user notes: Put "api/note/updateNote/:id login required"
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //newNote object to store note updation data
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //verifying note id and user id for users note confirmations
    let note = await Notes.findById(req.params.id);
    if (!note) {
       return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Found");
    }

    //updating users notes
    const noteUpdate = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ noteUpdate });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

//Route 4 : Delete an existing user notes: Delete "api/note/deleteNote/:id login required"
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    //verifying note id and user id for users note confirmations
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(404).send("Not Found");
    }

    //deleting users notes
    const noteDelete = await Notes.findByIdAndDelete(req.params.id);
    res.json({
      success: "Your note has been deleted successfully",
      note: noteDelete,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
