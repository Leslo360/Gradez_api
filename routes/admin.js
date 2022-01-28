import express from "express";
import {
  loginAdmin,
  createAdmin,
  readAdmins,
  readSingleAdmin,
} from "../Controllers/admin.js";

const router = express.Router();

// All Admins
router.get("/", readAdmins);

// Create
router.put("/new", createAdmin);

// Login
router.post("/login", loginAdmin);

// Read Single Student
router.get("/:id", readSingleAdmin);

export default router;
