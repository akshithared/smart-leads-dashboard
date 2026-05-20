import { Request, Response } from "express"

import Lead from "../models/Lead"
import { AuthRequest } from "../middleware/authMiddleware"

export const createLead = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { name, email, status, source } = req.body

    const lead = await Lead.create({
      name,
      email,
      status,
      source,
      createdBy: req.user._id,
    })

    res.status(201).json(lead)
  } catch (error) {
    res.status(500).json({
      message: "Failed to create lead",
    })
  }
}

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = 10
    const skip = (page - 1) * limit

    const search = req.query.search as string
    const status = req.query.status as string
    const source = req.query.source as string
    const sort = req.query.sort as string

    const query: any = {}

    // Search
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ]
    }

    // Filter status
    if (status) {
      query.status = status
    }

    // Filter source
    if (source) {
      query.source = source
    }

    // Sorting
    let sortOption = {}

    if (sort === "latest") {
      sortOption = { createdAt: -1 }
    } else if (sort === "oldest") {
      sortOption = { createdAt: 1 }
    }

    const totalRecords = await Lead.countDocuments(query)

    const leads = await Lead.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      leads,
      currentPage: page,
      totalPages: Math.ceil(totalRecords / limit),
      totalRecords,
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch leads",
    })
  }
}

export const getSingleLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.findById(req.params.id)

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      })
    }

    res.status(200).json(lead)
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch lead",
    })
  }
}

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )

    res.status(200).json(updatedLead)
  } catch (error) {
    res.status(500).json({
      message: "Failed to update lead",
    })
  }
}

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    await Lead.findByIdAndDelete(req.params.id)

    res.status(200).json({
      message: "Lead deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete lead",
    })
  }
}