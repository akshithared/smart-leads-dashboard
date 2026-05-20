import { Request, Response } from "express"
import bcrypt from "bcryptjs"

import User from "../models/User"
import generateToken from "../utils/generateToken"

export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    })

    // Response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString()),
    })
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
    })
  }
}

export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    // Login success response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString()),
    })
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
    })
  }
}