import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createLoan = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      await prisma.loan.create({
        data: { ...req.body },
      });
  
      const newLoans = await prisma.loan.findMany();
  
      return res.status(201).json({
        msg: "Loan successfully created",
        data: newLoans,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getLoans = async (req, res) => {
    try {
      const loan = await prisma.loan.findMany();
  
      if (loan.length === 0) {
        return res.status(404).json({ msg: "No loans found" });
      }
  
      return res.json({ data: loan });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getLoan = async (req, res) => {
    try {
      const loan = await prisma.loan.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!loan) {
        return res
          .status(404)
          .json({ msg: `No loan with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: loan,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateLoan = async (req, res) => {
    try {
      const contentType = req.headers["content-type"];
      if (!contentType || contentType !== "application/json") {
        return res.status(400).json({
          msg: "Invalid Content-Type. Expected application/json.",
        });
      }
  
      let loan = await prisma.loan.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!loan) {
        return res
          .status(404)
          .json({ msg: `No loan with the id: ${req.params.id} found` });
      }
  
      loan = await prisma.loan.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `Loan with the id: ${req.params.id} successfully updated`,
        data: loan,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteLoan = async (req, res) => {
    try {
      const loan = await prisma.loan.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!loan) {
        return res
          .status(404)
          .json({ msg: `No loan with the id: ${req.params.id} found` });
      }
  
      await prisma.loan.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `Loan with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };


  const filterLoans = async (req, res) => {
    try {
      const query = {
      };

      if (req.query.id || req.query.book || req.query.member || req.query.loan_date || req.query.return_by
        || req.query.library || req.query.createdAt || req.query.updatedAt || req.query.bookId
        || req.query.libraryId || req.query.memberId) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          book: {
            equals: req.query.book || undefined,
          },
          member: {
            equals: req.query.member || undefined,
          },
          loan_date: {
            equals: req.query.loan_date || undefined,
          },
          return_by: {
            equals: req.query.return_by || undefined,
          },
          library: {
            equals: req.query.library || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          bookId: {
            equals: req.query.bookId || undefined,
          },
          libraryId: {
            equals: req.query.libraryId || undefined,
          },
          memberId: {
            equals: req.query.memberId || undefined,
          },
        };
      }
  
      const loan = await prisma.loan.findMany(query);
  
      if (loan.length === 0) {
        return res.status(200).json({ msg: "No loans found" });
      }
  
      return res.json({
        data: loan,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  
  const sortLoans = async (req, res) => {
    try {
      const sortBy = req.query.sortBy || "id";
      const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";
  
      const query = {
        orderBy: {
          [sortBy]: sortOrder,
        },
      };
  
      if (req.query.id || req.query.book || req.query.member || req.query.loan_date || req.query.return_by
        || req.query.library || req.query.createdAt || req.query.updatedAt || req.query.bookId
        || req.query.libraryId || req.query.memberId) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          book: {
            equals: req.query.book || undefined,
          },
          member: {
            equals: req.query.member || undefined,
          },
          loan_date: {
            equals: req.query.loan_date || undefined,
          },
          return_by: {
            equals: req.query.return_by || undefined,
          },
          library: {
            equals: req.query.library || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          bookId: {
            equals: req.query.bookId || undefined,
          },
          libraryId: {
            equals: req.query.libraryId || undefined,
          },
          memberId: {
            equals: req.query.memberId || undefined,
          },
        };
      }
  
      const loan = await prisma.loan.findMany(query);
  
      if (loan.length === 0) {
        return res.status(200).json({ msg: "No loans found" });
      }
  
      return res.json({
        data: loan,
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
  
  const pageLoans = async (req, res) => {
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
  
      if (req.query.id || req.query.book || req.query.member || req.query.loan_date || req.query.return_by
        || req.query.library || req.query.createdAt || req.query.updatedAt || req.query.bookId
        || req.query.libraryId || req.query.memberId) {
        query.where = {
          id: {
            equals: req.query.id || undefined,
          },
          book: {
            equals: req.query.book || undefined,
          },
          member: {
            equals: req.query.member || undefined,
          },
          loan_date: {
            equals: req.query.loan_date || undefined,
          },
          return_by: {
            equals: req.query.return_by || undefined,
          },
          library: {
            equals: req.query.library || undefined,
          },
          createdAt: {
            equals: req.query.createdAt || undefined,
          },
          updatedAt: {
            equals: req.query.updatedAt || undefined,
          },
          bookId: {
            equals: req.query.bookId || undefined,
          },
          libraryId: {
            equals: req.query.libraryId || undefined,
          },
          memberId: {
            equals: req.query.memberId || undefined,
          },
        };
      }
  
      const loan = await prisma.loan.findMany(query);
  
      if (loan.length === 0) {
        return res.status(200).json({ msg: "No libraries found" });
      }
  
      const hasNextPage = genre.loan === Number(amount);
  
      return res.json({
        data: loan,
        nextPage: hasNextPage ? Number(page) + 1 : null,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };


  export {
    createLoan,
    getLoans,
    getLoan,
    updateLoan,
    deleteLoan,
    filterLoans,
    sortLoans,
    pageLoans
  };