import { Request, Response } from "express"

import Lead from "../models/Lead"



// CREATE LEAD
export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      name,
      email,
      status,
      source,
    } = req.body



    // REQUIRED FIELD VALIDATION
    if (
      !name ||
      !email ||
      !status ||
      !source
    ) {

      res.status(400).json({
        message:
          "All fields are required",
      })

      return
    }



    // EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/



    if (
      !emailRegex.test(email)
    ) {

      res.status(400).json({
        message:
          "Invalid email format",
      })

      return
    }



    // STATUS VALIDATION
    const validStatuses = [
      "New",
      "Contacted",
      "Qualified",
      "Lost",
    ]



    if (
      !validStatuses.includes(
        status
      )
    ) {

      res.status(400).json({
        message:
          "Invalid status value",
      })

      return
    }



    // SOURCE VALIDATION
    const validSources = [
      "Website",
      "Instagram",
      "Referral",
    ]



    if (
      !validSources.includes(
        source
      )
    ) {

      res.status(400).json({
        message:
          "Invalid source value",
      })

      return
    }



    const lead =
      await Lead.create({
        name,
        email,
        status,
        source,
      })



    res.status(201).json(
      lead
    )

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message:
        "Failed to create lead",
    })
  }
}



// GET ALL LEADS
export const getLeads = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const page =
      Number(req.query.page) || 1

    const limit = 10

    const skip =
      (page - 1) * limit

    const search =
      req.query.search || ""

    const status =
      req.query.status || ""

    const source =
      req.query.source || ""

    const sort =
      req.query.sort || "latest"



    const query: any = {}



    // SEARCH BY NAME OR EMAIL
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



    // FILTER BY STATUS
    if (status) {

      query.status = {
        $regex: status,
        $options: "i",
      }
    }



    // FILTER BY SOURCE
    if (source) {

      query.source = {
        $regex: source,
        $options: "i",
      }
    }



    // SORTING
    const sortOption: any =
      sort === "oldest"
        ? { createdAt: 1 }
        : { createdAt: -1 }



    const leads =
      await Lead.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)



    const total =
      await Lead.countDocuments(query)



    res.status(200).json({
      leads,
      currentPage: page,
      totalPages: Math.ceil(
        total / limit
      ),
      totalLeads: total,
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message:
        "Failed to fetch leads",
    })
  }
}



// GET SINGLE LEAD
export const getLeadById = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const lead =
      await Lead.findById(
        req.params.id
      )



    if (!lead) {

      res.status(404).json({
        message:
          "Lead not found",
      })

      return
    }



    res.status(200).json(
      lead
    )

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message:
        "Failed to fetch lead",
    })
  }
}



// UPDATE LEAD
export const updateLead = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const {
      name,
      email,
      status,
      source,
    } = req.body



    // REQUIRED FIELD VALIDATION
    if (
      !name ||
      !email ||
      !status ||
      !source
    ) {

      res.status(400).json({
        message:
          "All fields are required",
      })

      return
    }



    // EMAIL VALIDATION
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/



    if (
      !emailRegex.test(email)
    ) {

      res.status(400).json({
        message:
          "Invalid email format",
      })

      return
    }



    const updatedLead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )



    if (!updatedLead) {

      res.status(404).json({
        message:
          "Lead not found",
      })

      return
    }



    res.status(200).json(
      updatedLead
    )

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message:
        "Failed to update lead",
    })
  }
}



// DELETE LEAD
export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {

  try {

    const deletedLead =
      await Lead.findByIdAndDelete(
        req.params.id
      )



    if (!deletedLead) {

      res.status(404).json({
        message:
          "Lead not found",
      })

      return
    }



    res.status(200).json({
      message:
        "Lead deleted successfully",
    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      message:
        "Failed to delete lead",
    })
  }
}