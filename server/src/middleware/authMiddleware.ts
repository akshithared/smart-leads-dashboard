import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

import User from "../models/User"

export interface AuthRequest extends Request {
  user?: any
}

interface DecodedToken extends JwtPayload {
  id: string
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(
        token as string,
        process.env.JWT_SECRET as string
      ) as DecodedToken

      req.user = await User.findById(decoded.id).select("-password")

      next()
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized",
      })
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token",
    })
  }
}