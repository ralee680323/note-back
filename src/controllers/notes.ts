import { Request, Response } from 'express';
import { Note } from '../models/Note';
import { AuthRequest } from '../types';

// Get all notes for a user
export const getNotes = async (req: AuthRequest, res: Response) => {
  try {
    const notes = await Note.find({ user: req.user?.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes' });
  }
};

// Get a single note
export const getNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user?.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching note' });
  }
};

// Create a new note
export const createNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      user: req.user?.id
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error creating note' });
  }
};

// Update a note
export const updateNote = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.id },
      { title, content, updatedAt: Date.now() },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Error updating note' });
  }
};

// Delete a note
export const deleteNote = async (req: AuthRequest, res: Response) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user?.id });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note' });
  }
}; 