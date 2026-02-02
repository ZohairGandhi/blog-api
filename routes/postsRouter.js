import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postsController.js";
import {
  createComment,
  getComments,
} from "../controllers/commentsController.js";

const router = Router();

router.get("/", async (_, res) => {
  const posts = await getAllPosts();
  res.status(200).send(posts);
});

router.post("/", async (req, res) => {
  const { title, content, userId } = req.body;
  await createPost(title, content, Number(userId));
  res.status(201).send("Post created successfully!");
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const post = await getPost(id);
  res.status(200).send(post);
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { title, content, published } = req.body;
  let publishedBool = published === "true" ? true : false;
  await updatePost(id, title, content, publishedBool);
  res.status(200).send("Post updated successfully!");
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await deletePost(id);
  res.status(200).send("Post deleted successfully!");
});

router.get("/:id/comments", async (req, res) => {
  const id = Number(req.params.id);
  const comments = await getComments(id);
  res.status(200).send(comments);
});

router.post("/:id/comments", async (req, res) => {
  const id = Number(req.params.id);
  const { content, userId } = req.body;
  await createComment(content, Number(userId), id);
  res.status(201).send("Comment created successfully!");
});

export { router as postsRouter };
