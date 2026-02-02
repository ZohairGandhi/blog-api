import { Router } from "express";
import {
  createUser,
  getUser,
  getUserPosts,
} from "../controllers/usersController.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, username, password } = req.body;
  await createUser(firstName, lastName, username, password);
  res.status(201).send("User created successfully!");
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await getUser(id);
  res.status(200).send(user);
});

router.get("/:id/posts", async (req, res) => {
  const id = Number(req.params.id);
  const posts = await getUserPosts(id);
  res.status(200).send(posts);
});

export { router as usersRouter };
