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