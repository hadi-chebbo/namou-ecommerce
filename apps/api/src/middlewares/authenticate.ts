import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string,
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

function getJwtSecret(): string{
    const secret = process.env.JWT_SECRET;

    if(!secret) {
        throw new Error("JWT_SECRET is not configured");
    }

    return secret;
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.access_token as string | undefined;

    if(!token) {
        res.status(401).json({
            message: "Authentication required",
        });

        return;
    }

    try {
        const decoded = jwt.verify(token, getJwtSecret());

        if(
            typeof decoded !== "object" ||
            decoded == null ||
            typeof decoded.userId !== "string"
        ) {
            res.status(401).json({
                message: "Invalid authentication token",
            });

            return;
        }

        req.user = {
            userId: decoded.userId,
        };

        next();
    } catch {
        res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}