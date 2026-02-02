import { prisma } from "../lib/prisma.js";

async function getAllPosts() {
  return await prisma.post.findMany();
}

async function createPost(title, content, userId) {
  await prisma.post.create({
    data: {
      title: title,
      content: content,
      userId: userId,
    },
  });
}

async function getPost(id) {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  return post;
}

async function updatePost(id, title, content, published) {
  await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
}

async function deletePost(id) {
  await prisma.post.delete({
    where: {
      id: id,
    },
  });
}

export { getAllPosts, createPost, getPost, updatePost, deletePost };
