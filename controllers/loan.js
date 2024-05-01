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

  export {
    createLoan,
    getLoans,
    getLoan,
    updateLoan,
    deleteLoan,
  };