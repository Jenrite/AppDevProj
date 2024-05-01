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

  export {
    createMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember,
  };