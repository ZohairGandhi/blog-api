import { Router } from "express";
import { deleteComment } from "../controllers/commentsController.js";

const router = Router();

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  await deleteComment(id);
  res.status(200).send("Comment deleted successfully!");
});

export { router as commentsRouter };
