import express from 'express';
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
} from '../controllers/books.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(verifyJWT);

router.post('/create', createBook);
router.get('/getAll', getAllBooks);
router.get('/get/:id', getBookById);
router.put('/update/:id', updateBookById);
router.delete('/delete/:id', deleteBookById);

export default router;
