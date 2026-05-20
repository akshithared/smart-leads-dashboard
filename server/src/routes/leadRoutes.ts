import express from "express"

import {
  createLead,
  getLeads,
  getSingleLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController"

import { protect } from "../middleware/authMiddleware"

const router = express.Router()

router.route("/")
  .post(protect, createLead)
  .get(protect, getLeads)

router.route("/:id")
  .get(protect, getSingleLead)
  .put(protect, updateLead)
  .delete(protect, deleteLead)

export default router