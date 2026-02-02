import { prisma } from "../lib/prisma.js";

async function getComments(postId) {
  const comments = await prisma.comment.findMany({
    where: {
      postId: postId,
    },
  });

  return comments;
}

async function createComment(content, userId, postId) {
  await prisma.comment.create({
    data: {
      content: content,
      userId: userId,
      postId: postId,
    },
  });
}

async function deleteComment(id) {
  await prisma.comment.delete({
    where: {
      id: id,
    },
  });
}

export { getComments, createComment, deleteComment };
