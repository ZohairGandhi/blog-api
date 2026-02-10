import express from "express";
import { usersRouter } from "./routes/usersRouter.js";
import { postsRouter } from "./routes/postsRouter.js";
import { commentsRouter } from "./routes/commentsRouter.js";
import { configPassport } from "./lib/passport.js";
import passport from "passport";

const app = express();
const port = 3000;

configPassport(passport);

app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
