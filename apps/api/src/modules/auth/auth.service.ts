import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@ecommerce/db";
import type { LoginInput } from "./auth.validation";
import { AppError } from "../../utils/AppError";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

export async function login(input: LoginInput) {
  const user = await User.findOne({
    where: {
      email: input.email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(
    input.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    getJwtSecret(),
    {
      expiresIn: "1d",
    },
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}

export async function getCurrentUser(userId: string) {
  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email"],
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
}