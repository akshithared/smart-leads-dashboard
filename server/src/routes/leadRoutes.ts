import express from "express"

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leadController"

import {
  protect,
} from "../middleware/authMiddleware"

const router = express.Router()



// CREATE LEAD
router.post(
  "/",
  protect,
  createLead
)



// GET ALL LEADS
router.get(
  "/",
  protect,
  getLeads
)



// GET SINGLE LEAD
router.get(
  "/:id",
  protect,
  getLeadById
)



// UPDATE LEAD
router.put(
  "/:id",
  protect,
  updateLead
)



// DELETE LEAD
router.delete(
  "/:id",
  protect,
  deleteLead
)

export default router