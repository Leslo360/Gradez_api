import express from "express";
import {
  readUsers,
  readSingleUser,
  createUser,
  updateUser,
  deleteUser
} from "../Controllers/index.js";


const router = express.Router();

// Read
router.get("/", readUsers);

// Read Single Student
router.get("/:id", readSingleUser);

// Create
router.put("/new", createUser);

// Update
router.patch("/:id", updateUser);

// Delete
router.delete("/:id", deleteUser);

export default router;
