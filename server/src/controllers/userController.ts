import { Response } from "express"
import { AuthRequest } from "../middleware/authMiddleware"

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  res.status(200).json(req.user)
}