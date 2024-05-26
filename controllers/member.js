import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createMember = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.member.create({
        data: { ...req.body },
      });
  
      const newMembers = await prisma.member.findMany();
  
      return res.status(201).json({
        msg: "Member successfully created",
        data: newMembers,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getMembers = async (req, res) => {
    try {
      const member = await prisma.member.findMany();
  
      if (member.length === 0) {
        return res.status(404).json({ msg: "No members found" });
      }
  
      return res.json({ data: member });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getMember = async (req, res) => {
    try {
      const member = await prisma.member.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!member) {
        return res
          .status(404)
          .json({ msg: `No member with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: member,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateMember = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let member = await prisma.member.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!member) {
        return res
          .status(404)
          .json({ msg: `No member with the id: ${req.params.id} found` });
      }
  
      member = await prisma.member.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Member with the id: ${req.params.id} successfully updated`,
        data: member,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteMember = async (req, res) => {
    try {
      const member = await prisma.member.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!member) {
        return res
          .status(404)
          .json({ msg: `No member with the id: ${req.params.id} found` });
      }
  
      await prisma.member.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Member with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const filterMembers = async (req, res) => {
    try {
      const query = {};
  
      if (
        req.query.id ||  req.query.genre_name || req.query.book_num || req.query.language
        || req.query.fiction || req.query.createdAt || req.query.updatedAt || req.query.books) {
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
          }
        };
      }
  
      const member = await prisma.member.findMany(query);
  
      if (member.length === 0) {
        return res.status(200).json({ msg: "No members found" });
      }
  
      return res.json({
        data: member,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };
  
  const sortMembers = async (req, res) => {
    try {
      const sortBy = req.query.sortBy || "id";
      const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";
  
      const query = {
        orderBy: {
          [sortBy]: sortOrder,
        },
      };
  
      if (
        req.query.id ||  req.query.genre_name || req.query.book_num || req.query.language
        || req.query.fiction || req.query.createdAt || req.query.updatedAt || req.query.books
      ) {
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
          }
        };
      }
  
      const member = await prisma.member.findMany(query);
  
      if (member.length === 0) {
        return res.status(200).json({ msg: "No members found" });
      }
  
      return res.json({
        data: member,
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
  
  const pageMembers = async (req, res) => {
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
  
      if (
        req.query.id ||  req.query.genre_name || req.query.book_num || req.query.language
        || req.query.fiction || req.query.createdAt || req.query.updatedAt || req.query.books
      ) {
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
          }
        };
      }
  
      const member = await prisma.member.findMany(query);
  
      if (member.length === 0) {
        return res.status(200).json({ msg: "No members found" });
      }
  
      const hasNextPage = genre.member === Number(amount);
  
      return res.json({
        data: member,
        nextPage: hasNextPage ? Number(page) + 1 : null,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };
  
  export {
    createMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    filterMembers,
    sortMembers,
    pageMembers,
  };