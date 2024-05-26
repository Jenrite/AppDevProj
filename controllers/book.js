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

  const filterBooks = async (req, res) => {
    try {
      const query = {};
  
      if (req.query.id ||  req.query.title || req.query.pub_year || req.query.on_hold
        || req.query.createdAt || req.query.updatedAt || req.query.Author || req.query.authorId 
        || req.query.Genre || req.query.genreId || req.query.Loan || req.query.Library || req.query.libraryId) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          title: {
            equals: req.query.title || undefined,
          },
          pub_year: {
            equals: req.query.pub_year || undefined,
          },
          on_hold: {
            equals: req.query.on_hold || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          Author: {
            equals: req.query.Author || undefined,
          },
          authorId: {
            equals: req.query.authorId || undefined,
          },
          memberId: {
            equals: req.query.memberId || undefined,
          },
          Genre: {
            equals: req.query.Genre || undefined,
          },
          genreId: {
            equals: req.query.genreId || undefined,
          },
          Loan: {
            equals: req.query.Loan || undefined,
          },
          Library: {
            equals: req.query.Library || undefined,
          },
          libraryId: {
            equals: req.query.libraryId || undefined,
          }
        };
      }
  
      const book = await prisma.book.findMany(query);
  
      if (book.length === 0) {
        return res.status(200).json({ msg: "No books found" });
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
  
  const sortBooks = async (req, res) => {
    try {
      const sortBy = req.query.sortBy || "id";
      const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";
  
      const query = {
        orderBy: {
          [sortBy]: sortOrder,
        },
      };
  
      if (req.query.id ||  req.query.title || req.query.pub_year || req.query.on_hold
        || req.query.createdAt || req.query.updatedAt || req.query.Author || req.query.authorId 
        || req.query.Genre || req.query.genreId || req.query.Loan || req.query.Library || req.query.libraryId) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          title: {
            equals: req.query.title || undefined,
          },
          pub_year: {
            equals: req.query.pub_year || undefined,
          },
          on_hold: {
            equals: req.query.on_hold || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          Author: {
            equals: req.query.Author || undefined,
          },
          authorId: {
            equals: req.query.authorId || undefined,
          },
          memberId: {
            equals: req.query.memberId || undefined,
          },
          Genre: {
            equals: req.query.Genre || undefined,
          },
          genreId: {
            equals: req.query.genreId || undefined,
          },
          Loan: {
            equals: req.query.Loan || undefined,
          },
          Library: {
            equals: req.query.Library || undefined,
          },
          libraryId: {
            equals: req.query.libraryId || undefined,
          }
        };
      }
  
      const book = await prisma.book.findMany(query);
  
      if (book.length === 0) {
        return res.status(200).json({ msg: "No books found" });
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
  
  const paginationDefault = {
    amount: 10, // The number of items per page
    page: 1, // The page number
  };
  
  const pageBooks = async (req, res) => {
    try {
      const sortBy = req.query.sortBy || "id";
      const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";
  
      const amount = req.query.amount || paginationDefault.amount;
      const page = req.query.page || paginationDefault.page;
  
      const query = {
        take: Number(amount),
        skip: (Number(page) - 1) * Number(amount),
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {},
      };
  
      if (req.query.id ||  req.query.title || req.query.pub_year || req.query.on_hold
        || req.query.createdAt || req.query.updatedAt || req.query.Author || req.query.authorId 
        || req.query.Genre || req.query.genreId || req.query.Loan || req.query.Library || req.query.libraryId) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          title: {
            equals: req.query.title || undefined,
          },
          pub_year: {
            equals: req.query.pub_year || undefined,
          },
          on_hold: {
            equals: req.query.on_hold || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          Author: {
            equals: req.query.Author || undefined,
          },
          authorId: {
            equals: req.query.authorId || undefined,
          },
          memberId: {
            equals: req.query.memberId || undefined,
          },
          Genre: {
            equals: req.query.Genre || undefined,
          },
          genreId: {
            equals: req.query.genreId || undefined,
          },
          Loan: {
            equals: req.query.Loan || undefined,
          },
          Library: {
            equals: req.query.Library || undefined,
          },
          libraryId: {
            equals: req.query.libraryId || undefined,
          }
        };
      }
  
      const book = await prisma.book.findMany(query);
  
      if (book.length === 0) {
        return res.status(200).json({ msg: "No books found" });
      }
  
      const hasNextPage = genre.book === Number(amount);
  
      return res.json({
        data: book,
        nextPage: hasNextPage ? Number(page) + 1 : null,
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
    filterBooks,
    sortBooks,
    pageBooks,
  };
  

