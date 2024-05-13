import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAuthor = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.author.create({
        data: { ...req.body },
      });
  
      const newAuthors = await prisma.author.findMany();
  
      return res.status(201).json({
        msg: "Author successfully created",
        data: newAuthors,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getAuthors = async (req, res) => {
    try {
      const author = await prisma.author.findMany();
  
      if (author.length === 0) {
        return res.status(404).json({ msg: "No authors found" });
      }
  
      return res.json({ data: author });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getAuthor = async (req, res) => {
    try {
      const author = await prisma.author.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!author) {
        return res
          .status(404)
          .json({ msg: `No author with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: author,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateAuthor = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let author = await prisma.author.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!author) {
        return res
          .status(404)
          .json({ msg: `No author with the id: ${req.params.id} found` });
      }
  
      author = await prisma.author.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Author with the id: ${req.params.id} successfully updated`,
        data: author,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteAuthor = async (req, res) => {
    try {
      const author = await prisma.author.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!author) {
        return res
          .status(404)
          .json({ msg: `No author with the id: ${req.params.id} found` });
      }
  
      await prisma.author.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Author with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };


  const filterAuthors = async (req, res) => {
    try {
      const query = {
      };
  
      if (req.query.id || req.query.first_name || req.query.last_name || req.query.birth_date || req.query.death_date
        || req.query.createdAt || req.query.updatedAt || req.query.books) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          first_name: {
            equals: req.query.first_name || undefined,
          },
          last_name: {
            equals: req.query.last_name || undefined,
          },
          birth_date: {
            equals: req.query.birth_date || undefined,
          },
          death_date: {
            equals: req.query.death_date || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          books: {
            equals: req.query.books || undefined,
          },
        };
      }
  
      const author = await prisma.author.findMany(query);
  
      if (author.length === 0) {
        return res.status(200).json({ msg: "No authors found" });
      }
  
      return res.json({
        data: author,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  
  const sortAuthors = async (req, res) => {
    try {
      const sortBy = req.query.sortBy || "id";
      const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";
  
      const query = {
        orderBy: {
          [sortBy]: sortOrder,
        },
      };
  
      if (req.query.id || req.query.first_name || req.query.last_name || req.query.birth_date || req.query.death_date
        || req.query.createdAt || req.query.updatedAt || req.query.books) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          first_name: {
            equals: req.query.first_name || undefined,
          },
          last_name: {
            equals: req.query.last_name || undefined,
          },
          birth_date: {
            equals: req.query.birth_date || undefined,
          },
          death_date: {
            equals: req.query.death_date || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          books: {
            equals: req.query.books || undefined,
          },
        };
      }
  
      const author = await prisma.author.findMany(query);
  
      if (author.length === 0) {
        return res.status(200).json({ msg: "No authors found" });
      }
  
      return res.json({
        data: author,
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
  
  const pageAuthors = async (req, res) => {
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
        include: {
        },
      };
  
      if (req.query.id || req.query.first_name || req.query.last_name || req.query.birth_date || req.query.death_date
        || req.query.createdAt || req.query.updatedAt || req.query.books) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          first_name: {
            equals: req.query.first_name || undefined,
          },
          last_name: {
            equals: req.query.last_name || undefined,
          },
          birth_date: {
            equals: req.query.birth_date || undefined,
          },
          death_date: {
            equals: req.query.death_date || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          books: {
            equals: req.query.books || undefined,
          },
        };
      }
  
      const author = await prisma.author.findMany(query);
  
      if (author.length === 0) {
        return res.status(200).json({ msg: "No authors found" });
      }
  
      const hasNextPage = author.length === Number(amount);
  
      return res.json({
        data: author,
        nextPage: hasNextPage ? Number(page) + 1 : null,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createAuthor,
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor,
    filterAuthors,
    sortAuthors,
    pageAuthors
  };