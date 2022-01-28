import express from "express";
import {
  readUsers,
  readSingleUser,
  createUser,
  updateUser,
  deleteUser,
  login,
} from "../Controllers/index.js";

const router = express.Router();

// Read
router.get("/", readUsers);

// Read Single Student
router.get("/:id", readSingleUser);

// Create
router.put("/new", createUser);

// Login
router.post("/login", login);

// Update
router.patch("/:username", updateUser);

// Delete
router.delete("/:id", deleteUser);

export default router;
