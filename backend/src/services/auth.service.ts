import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import  prisma from "../config/db"; 

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export class AuthService {
  // Register user
  async registerUser(name: string, email: string, password: string) {
    const hashPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: { name, email, password: hashPassword },
    });
  }

  // Login user
  async loginUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new Error("User not found.");
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Senha incorreta.");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, SECRET!, { expiresIn: "24h" });

    return { user, token };
  }
}
