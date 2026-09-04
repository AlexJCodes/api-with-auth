import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      message: "Username and password are required",
    });
    return;
  }

  if (username !== "admin" || password !== "123") {
    res.status(401).json({
      message: "Invalid username or password",
    });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).json({
      message: "JWT secret is not configured",
    });
    return;
  }

  const accessToken = jwt.sign(
    { username },
    jwtSecret,
    { expiresIn: "7d" },
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.json({
    message: "You are logged in",
    isLoggedIn: true,
  });
};

export const register = (_req: Request, res: Response) => {
  res.status(501).json({
    message: "Registration is not implemented yet",
  });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("accessToken");

  res.json({
    message: "You are logged out",
  });
};