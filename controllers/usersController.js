import { prisma } from "../lib/prisma.js";

async function createUser(firstName, lastName, username, password) {
  await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
    },
  });
}

async function getUser(id) {
  const user = await prisma.user.findUniqueOrThrow({
    omit: {
      password: true,
    },
    where: {
      id: id,
    },
  });

  return user;
}

async function getUserPosts(id) {
  const posts = await prisma.user.findUniqueOrThrow({
    select: {
      posts: true,
    },
    where: {
      id: id,
    },
  });

  return posts;
}

export { createUser, getUser, getUserPosts };
