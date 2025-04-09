import Book from "../models/book.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const createBook = asyncHandler(async (req, res) => {
  const { title, author, category, price, rating, publishedDate } = req.body;

  if (![title, author, category, price, publishedDate].every(Boolean)) {
    throw new ApiError(400, "All fields except rating are required");
  }

  const book = await Book.create({
    title,
    author,
    category,
    price,
    rating: rating || 0,
    publishedDate,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, book, "Book created successfully"));
});

export const getAllBooks = asyncHandler(async (req, res) => {
  const {
    author,
    category,
    rating,
    search,
    page = 1,
    limit = 10,
    sortBy,
    order = "asc",
  } = req.query;

  const query = {};

  if (author) {
    query.author = { $regex: new RegExp(author, "i") };
  }

  if (category) {
    query.category = { $regex: new RegExp(category, "i") };
  }

  if (rating) {
    const ratingNumber = parseFloat(rating);
    if (!isNaN(ratingNumber)) {
      query.rating = ratingNumber;
    }
  }

  if (search) {
    query.title = { $regex: new RegExp(search, "i") };
  }

  const currentPage = parseInt(page);
  const itemsPerPage = parseInt(limit);
  const skip = (currentPage - 1) * itemsPerPage;

  const sortOption = {};
  if (sortBy === "price" || sortBy === "rating") {
    sortOption[sortBy] = order === "desc" ? -1 : 1;
  }

  const totalBooks = await Book.countDocuments(query);
  const totalPages = Math.ceil(totalBooks / itemsPerPage);

  const books = await Book.find(query)
    .sort(sortOption)
    .skip(skip)
    .limit(itemsPerPage);

  if (books.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, [], "No results found for the given query"));
  }

  const responseData = {
    books,
    pagination: {
      totalBooks,
      totalPages,
      currentPage,
      limit: itemsPerPage,
    },
  };

  return res
    .status(200)
    .json(new ApiResponse(200, responseData, "Books retrieved successfully"));
});

export const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid book ID");
  }

  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }

  return res.status(200).json(new ApiResponse(200, book));
});

export const updateBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid book ID");
  }

  const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBook) {
    throw new ApiError(404, "Book not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedBook, "Book updated successfully"));
});

export const deleteBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid book ID");
  }

  const deletedBook = await Book.findByIdAndDelete(id);

  if (!deletedBook) {
    throw new ApiError(404, "Book not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedBook, "Book deleted successfully"));
});
