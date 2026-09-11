import type { Request, Response } from "express";
import * as authService from "./auth.service";

export async function login(req: Request, res: Response): Promise<void> {
    const result = await authService.login(req.body);

    res.cookie("access_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: result.user,
    });
}

export async function me(req: Request, res: Response): Promise<void> {
    const user = await authService.getCurrentUser(req.user!.userId);

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
}

export function logout(_req: Request, res: Response): void {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
}