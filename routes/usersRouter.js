import { Router } from "express";
import {
  createUser,
  getUser,
  getUserPosts,
} from "../controllers/usersController.js";
import { validateUser } from "../middleware/validateUser.js";
import { matchedData, validationResult } from "express-validator";
import { hash } from "bcrypt";
import { generateJwt } from "../lib/jwt.js";
import passport from "passport";

const router = Router();

router.post("/register", validateUser, async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { firstName, lastName, username, password } = matchedData(req);
    const hashedPassword = await hash(password, 10);
    await createUser(firstName, lastName, username, hashedPassword);
    res.status(201).send("User created successfully!");
  } else {
    res.status(400).send({ errors });
  }
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    const { user } = req;
    if (!user) {
      res.status(401).send("Incorrect username or password.");
    }
    const token = generateJwt(user);
    res.status(200).send(token);
  },
);

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
