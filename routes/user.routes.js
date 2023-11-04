import { Router } from "express";
const router = Router();
import {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
