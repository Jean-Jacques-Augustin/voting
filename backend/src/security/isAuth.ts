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

// Stockez la clé JWT à l'extérieur de la fonction middleware
const decodedTokenKey = jwt_key;

const authMiddleware = (allowedRoles: Role[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Missing token" });
    }

    console.log(token);

    try {
      const decodedToken = jwt.verify(token, decodedTokenKey) as DecodedToken;

      console.log(decodedToken);

      const userRole: Role = decodedToken?.information.role;

      if (!decodedToken?.information.is_verified) {
        console.log("User not verified");
        return res.status(400).json({
          message: "Utilisateur non vérifié",
        });
      }

      if (!allowedRoles.includes(userRole)) {
        console.log("User not allowed", userRole);
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
