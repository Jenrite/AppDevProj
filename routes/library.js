import express from "express";

import {
    createLibrary,
    getLibraries,
    getLibrary,
    updateLibrary,
    deleteLibrary,
} from "../controllers/library.js";

const router = express.Router();

router.post("/", createLibrary);
router.get("/", getLibraries);
router.get("/:id", getLibrary);
router.put("/:id", updateLibrary);
router.delete("/:id", deleteLibrary);

export default router;
