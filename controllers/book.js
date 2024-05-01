import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBook = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.book.create({
        data: { ...req.body },
      });
  
      const newBooks = await prisma.book.findMany();
  
      return res.status(201).json({
        msg: "Book successfully created",
        data: newBooks,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getBooks = async (req, res) => {
    try {
      const book = await prisma.book.findMany();
  
      if (book.length === 0) {
        return res.status(404).json({ msg: "No books found" });
      }
  
      return res.json({ data: book });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getBook = async (req, res) => {
    try {
      const book = await prisma.book.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!book) {
        return res
          .status(404)
          .json({ msg: `No institution with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: book,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateBook = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let book = await prisma.book.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!book) {
        return res
          .status(404)
          .json({ msg: `No institution with the id: ${req.params.id} found` });
      }
  
      book = await prisma.book.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Book with the id: ${req.params.id} successfully updated`,
        data: book,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteBook = async (req, res) => {
    try {
      const book = await prisma.book.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!book) {
        return res
          .status(404)
          .json({ msg: `No book with the id: ${req.params.id} found` });
      }
  
      await prisma.book.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `book with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
  };