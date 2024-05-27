// Import the Express module
import express from "express";
require('dotenv').config();

// Routes go here
import authorRoute from "./routes/author.js";
import bookRoute from "./routes/book.js";
import genreRoute from "./routes/genre.js";
import libraryRoute from "./routes/library.js";
import loanRoute from "./routes/loan.js";
import memberRoute from "./routes/member.js";

// Import the CORS module
import cors from "cors";

// Create an Express application
const app = express();

// This should be declared under app.use(cors());
app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads. For example, form data

// This should be declared under app.use(urlencoded({ extended: false }));
app.use(express.json()); // To parse the incoming requests with JSON payloads. For example, REST API requests

app.use("/api/authors", authorRoute);
app.use("/api/books", bookRoute);
app.use("/api/genres", genreRoute);
app.use("/api/libraries", libraryRoute);
app.use("/api/loans", loanRoute);
app.use("/api/members", memberRoute);

// Use the CORS module
app.use(cors());

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});

// Export the Express application. May be used by other modules. For example, API testing
export default app;
