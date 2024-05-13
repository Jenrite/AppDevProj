import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createGenre = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.genre.create({
        data: { ...req.body },
      });
  
      const newGenres = await prisma.genre.findMany();
  
      return res.status(201).json({
        msg: "Genre successfully created",
        data: newGenres,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getGenres = async (req, res) => {
    try {
      const genre = await prisma.genre.findMany();
  
      if (genre.length === 0) {
        return res.status(404).json({ msg: "No genres found" });
      }
  
      return res.json({ data: genre });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getGenre = async (req, res) => {
    try {
      const genre = await prisma.genre.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!genre) {
        return res
          .status(404)
          .json({ msg: `No genre with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: genre,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateGenre = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let genre = await prisma.genre.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!genre) {
        return res
          .status(404)
          .json({ msg: `No genre with the id: ${req.params.id} found` });
      }
  
      genre = await prisma.genre.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Genre with the id: ${req.params.id} successfully updated`,
        data: genre,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteGenre = async (req, res) => {
    try {
      const genre = await prisma.genre.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!genre) {
        return res
          .status(404)
          .json({ msg: `No genre with the id: ${req.params.id} found` });
      }
  
      await prisma.genre.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Genre with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const filterGenres = async (req, res) => {
    try {
      const query = {
      };

      if (req.query.id || req.query.genre_name || req.query.book_num || req.query.language || req.query.fiction
        || req.query.createdAt || req.query.updatedAt || req.query.books) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          genre_name: {
            equals: req.query.genre_name || undefined,
          },
          book_num: {
            equals: req.query.book_num || undefined,
          },
          language: {
            equals: req.query.language || undefined,
          },
          fiction: {
            equals: req.query.fiction || undefined,
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
  
      const genre = await prisma.genre.findMany(query);
  
      if (author.length === 0) {
        return res.status(200).json({ msg: "No genres found" });
      }
  
      return res.json({
        data: genre,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  
  const sortGenres = async (req, res) => {
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
  
      const genre = await prisma.genre.findMany(query);
  
      if (genre.length === 0) {
        return res.status(200).json({ msg: "No genres found" });
      }
  
      return res.json({
        data: genre,
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
  
  const pageGenres = async (req, res) => {
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
  
      const genre = await prisma.genre.findMany(query);
  
      if (genre.length === 0) {
        return res.status(200).json({ msg: "No genres found" });
      }
  
      const hasNextPage = genre.length === Number(amount);
  
      return res.json({
        data: genre,
        nextPage: hasNextPage ? Number(page) + 1 : null,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };


  export {
    createGenre,
    getGenres,
    getGenre,
    updateGenre,
    deleteGenre,
    filterGenres,
    sortGenres,
    pageGenres
  };