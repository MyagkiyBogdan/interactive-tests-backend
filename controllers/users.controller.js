import db from "../db/connection.js";
import { createUserQuery, getUserByEmail } from "../db/user.commands.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  const { name, surname, email, password, role } = req.body;
  try {
    const existingUser = await db.oneOrNone(getUserByEmail, [email]);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "A user with this email already exists" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await db.one(createUserQuery, [
      name,
      surname,
      email,
      hashedPassword,
      role,
    ]);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error when creating a user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.oneOrNone(getUserByEmail, [email]);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Wrong password" });
    }

    const userData = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
    };
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error when trying to log in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};
