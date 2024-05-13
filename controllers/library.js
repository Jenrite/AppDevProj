import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createLibrary = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.library.create({
        data: { ...req.body },
      });
  
      const newLibraries = await prisma.library.findMany();
  
      return res.status(201).json({
        msg: "Library successfully created",
        data: newLibraries,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getLibraries = async (req, res) => {
    try {
      const library = await prisma.library.findMany();
  
      if (library.length === 0) {
        return res.status(404).json({ msg: "No libraries found" });
      }
  
      return res.json({ data: library });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getLibrary = async (req, res) => {
    try {
      const library = await prisma.library.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!library) {
        return res
          .status(404)
          .json({ msg: `No library with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: library,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateLibrary = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let library = await prisma.library.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!library) {
        return res
          .status(404)
          .json({ msg: `No library with the id: ${req.params.id} found` });
      }
  
      library = await prisma.library.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Library with the id: ${req.params.id} successfully updated`,
        data: library,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteLibrary = async (req, res) => {
    try {
      const library = await prisma.library.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!library) {
        return res
          .status(404)
          .json({ msg: `No library with the id: ${req.params.id} found` });
      }
  
      await prisma.library.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Library with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const filterLibraries = async (req, res) => {
    try {
      const query = {
      };

      if (req.query.id || req.query.address || req.query.city || req.query.post_code || req.query.books
        || req.query.createdAt || req.query.updatedAt || req.query.loan) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          address: {
            equals: req.query.address || undefined,
          },
          city: {
            equals: req.query.city || undefined,
          },
          post_code: {
            equals: req.query.post_code || undefined,
          },
          books: {
            equals: req.query.books || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          loan: {
            equals: req.query.loan || undefined,
          },
        };
      }
  
      const library = await prisma.library.findMany(query);
  
      if (library.length === 0) {
        return res.status(200).json({ msg: "No libraries found" });
      }
  
      return res.json({
        data: library,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  
  const sortLibraries = async (req, res) => {
    try {
      const sortBy = req.query.sortBy || "id";
      const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";
  
      const query = {
        orderBy: {
          [sortBy]: sortOrder,
        },
      };
  
      if (req.query.id || req.query.address || req.query.city || req.query.post_code || req.query.books
        || req.query.createdAt || req.query.updatedAt || req.query.loan) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          address: {
            equals: req.query.address || undefined,
          },
          city: {
            equals: req.query.city || undefined,
          },
          post_code: {
            equals: req.query.post_code || undefined,
          },
          books: {
            equals: req.query.books || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          loan: {
            equals: req.query.loan || undefined,
          },
        };
      }
  
      const library = await prisma.library.findMany(query);
  
      if (library.length === 0) {
        return res.status(200).json({ msg: "No libraries found" });
      }
  
      return res.json({
        data: library,
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
  
  const pageLibraries = async (req, res) => {
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
  
      if (req.query.id || req.query.address || req.query.city || req.query.post_code || req.query.books
        || req.query.createdAt || req.query.updatedAt || req.query.loan) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          address: {
            equals: req.query.address || undefined,
          },
          city: {
            equals: req.query.city || undefined,
          },
          post_code: {
            equals: req.query.post_code || undefined,
          },
          books: {
            equals: req.query.books || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          loan: {
            equals: req.query.loan || undefined,
          },
        };
      }
  
      const library = await prisma.library.findMany(query);
  
      if (library.length === 0) {
        return res.status(200).json({ msg: "No libraries found" });
      }
  
      const hasNextPage = genre.library === Number(amount);
  
      return res.json({
        data: library,
        nextPage: hasNextPage ? Number(page) + 1 : null,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createLibrary,
    getLibraries,
    getLibrary,
    updateLibrary,
    deleteLibrary,
    filterLibraries,
    sortLibraries,
    pageLibraries
  };