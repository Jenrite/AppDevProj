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

  export {
    createGenre,
    getGenres,
    getGenre,
    updateGenre,
    deleteGenre,
  };