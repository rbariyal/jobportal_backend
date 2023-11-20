const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchjobs");
const { body, validationResult } = require("express-validator");
const jobposting = require("../models/Jobposting");
const fetchjobs = require("../middleware/fetchjobs");
const Jobposting = require("../models/Jobposting");

//Route1 :Get all the notes using get "api/notes/fetchnotes"
// router.get("/fetchjobs", fetchjobs, async (req, res) => {
//   try {
//     const notes = await Note.find({ user: req.user.id });
//     res.json(notes);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal server error");
//   }
// });

//Route2 :Add new notes using post "api/notes/addnotes"
router.post(
  "/addjobs",
  fetchuser,
  [
    body(" jobName", "Enter a valid title").isLength({
      min: 3,
    }),
    body("companyName", "Enter a valid company name").isLength({
        min: 3,
      }),
      body("experienceRequirement", "Enter a valid title").isNumeric(), 
    body("salaryPackage", "Enter a valid number").isNumeric(),
    body("location", "location must be atleast 4 characters").isLength({
      min: 4,
    }),
    body("jobType", "location must be atleast 4 characters").isString(),
    body("vacancy", "location must be atleast 4 characters").isLength({min:1}),
    body("shiftType", "required").isString(),
    body("jobDescription", "Description must be 8 characters required").isLength({
        min: 8,
      }),
  ],   async (req, res) => {
    try {
      const { jobName, companyName, experienceRequirement,salaryPackage,location,jobType,vacancy,shiftType,jobDescription} = req.body;

      //if there are error return bad request and error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const job = new Jobposting({jobName, companyName, experienceRequirement,salaryPackage,location,jobType,vacancy,shiftType,jobDescription, user: req.user.id });
      const savedNote = await job.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3: Update an existing Note using PUT '/api/notes/updatenote' Login required

// router.put("/updatenote/:id", fetchuser, async (req, res) => {
//   const { title, description, tag } = req.body;
//   try {
//     //Create a newnote object
//     const newNote = {};
//     if (title) {
//       newNote.title = title;
//     }
//     if (description) {
//       newNote.description = description;
//     }
//     if (tag) {
//       newNote.tag = tag;
//     }

//     //Find note to be updated

//     let note = await Note.findById(req.params.id);
//     if (!note) {
//       return res.status(404).send("Not Found");
//     }
//     if (note.user.toString() !== req.user.id) {
//       return res.status(401).send("Not allowed");
//     }
//     note = await Note.findByIdAndUpdate(
//       req.params.id,
//       { $set: newNote },
//       { new: true }
//     );

//     res.json({ note });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal server error");
//   }
// });

//Route 4: Delete an existing Note using delete '/api/notes/deletenote' Login required

// router.delete("/deletenote/:id", fetchuser, async (req, res) => {
//   try {
//     //Find note to be deleted
//     let note = await Note.findById(req.params.id);
//     if (!note) {
//       return res.status(404).send("Not Found");
//     }

//     //Allow deletion  is user is verified
//     if (note.user.toString() !== req.user.id) {
//       return res.status(401).send("Not allowed");
//     }
//     note = await Note.findByIdAndDelete(req.params.id);

//     res.json({ success: "Note deleted succesfully" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal server error");
//   }
// });

module.exports = router;
