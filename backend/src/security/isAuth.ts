import jwt, { JwtPayload } from "jsonwebtoken";
import { jwt_key } from "../utils/configuration";
import { NextFunction, Request, Response } from "express";

export enum Role {
  Admin = "admin",
  User = "user",
}

interface DecodedToken extends JwtPayload {
  information: {
    name: string;
    numvote: string;
    email: string;
    role: Role;
    is_verified: boolean;
  };
}

interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

const authMiddleware = (allowedRoles: Role[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (!token)
      return res.status(401).json({ message: "Missing token" });

    try {
      const decodedToken = jwt.verify(
        token,
        jwt_key
      ) as DecodedToken;

      const userRole: Role = decodedToken?.information.role;

      if(!decodedToken?.information.is_verified) {
        return res.status(400).json({
          message: "Utilisateur non vérifié",
        });
      }

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};

export default authMiddleware;
