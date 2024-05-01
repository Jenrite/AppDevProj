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