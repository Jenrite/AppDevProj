import express from "express";

import {
    createMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember,
} from "../controllers/member.js";

const router = express.Router();

router.post("/", createMember);
router.get("/", getMembers);
router.get("/:id", getMember);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;
