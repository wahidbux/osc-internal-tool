import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: { id: string };
  }
}

export default function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authHeader.slice(7).trim();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (!decoded || typeof decoded === "string") {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    const payload = decoded as JwtPayload & { id?: string };

    if (!payload.id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.user = { id: payload.id };
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
