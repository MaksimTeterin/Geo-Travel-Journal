const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
}

async function getUserById(id) {
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

async function createUser(login, password, name, email) {
  try {
    const user = await prisma.user.create({
      data: {
        login: login,
        password: password,
        name: name,
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Could not create user");
  }
}

async function removeUser(id) {
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    console.error("Error removing user:", error);
    throw new Error("Could not remove user");
  }
}

async function updateUser(id, login, password, name, email) {
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        login: login,
        password: password,
        name: name,
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Could not update user");
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
