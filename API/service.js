import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
}

export async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
}

export async function getUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Could not fetch user by ID");
  }
}

export async function getPostById(id) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("Could not fetch post by ID");
  }
}
