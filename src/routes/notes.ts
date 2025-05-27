import express from 'express';
import { body } from 'express-validator';
import auth from '../middleware/auth';
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} from '../controllers/notes';

const router = express.Router();

// Validation middleware
const validateNote = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ max: 1000 })
    .withMessage('Content must be less than 1000 characters')
];

// Routes
router.get('/', auth, getNotes);
router.get('/:id', auth, getNote);
router.post('/', auth, validateNote, createNote);
router.put('/:id', auth, validateNote, updateNote);
router.delete('/:id', auth, deleteNote);

export default router; 