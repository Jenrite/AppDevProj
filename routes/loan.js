import express from "express";

import {
    createLoan,
    getLoans,
    getLoan,
    updateLoan,
    deleteLoan,
} from "../controllers/loan.js";

const router = express.Router();

router.post("/", createLoan);
router.get("/", getLoans);
router.get("/:id", getLoan);
router.put("/:id", updateLoan);
router.delete("/:id", deleteLoan);

export default router;