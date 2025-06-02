const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
}

async function getPostById(id) {
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

async function createPost(user_id, header, imgLink, content, geolocation) {
  try {
    const post = await prisma.post.create({
      data: {
        user_id: user_id,
        header: header,
        imgLink: imgLink,
        content: content,
        geolocation: geolocation,
      },
    });
    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Could not create post");
  }
}

async function removePost(id) {
  try {
    const post = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return post;
  } catch (error) {
    console.error("Error removing post:", error);
    throw new Error("Could not remove post");
  }
}

async function updatePost(id, header, imgLink, content, geolocation) {
  try {
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        header: header,
        imgLink: imgLink,
        content: content,
        geolocation: geolocation,
      },
    });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user");
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  removePost,
};
