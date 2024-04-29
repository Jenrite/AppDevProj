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
  
      await prisma.Book.create({
        data: { ...req.body },
      });
  
      const newBooks = await prisma.institution.findMany();
  
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