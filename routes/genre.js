import express from "express";

import {
    createGenre,
    getGenres,
    getGenre,
    updateGenre,
    deleteGenre,
} from "../controllers/genre.js";

const router = express.Router();

router.post("/", createGenre);
router.get("/", getGenres);
router.get("/:id", getGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export default router;