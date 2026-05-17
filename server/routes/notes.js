const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes - pinned ones come first
router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ pinned: -1, createdAt: -1 });
  res.json(notes);
});

// POST create note
router.post('/', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.status(201).json(note);
});

// PUT update note
router.put('/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
});

// DELETE note
router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
});

module.exports = router;