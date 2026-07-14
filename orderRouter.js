import express from 'express'
import {validation, checkId, validId, validStatus} from './middleware.js'
import {addOrder, getOrders, getOrder, deleteById, updateDetails, updateStatus} from './ctrl.js'

const router = express.Router()

router.post("/", validation, checkId ,addOrder)

router.get("/", getOrders)

router.get("/:id", validId, getOrder)

router.put("/:id", validId, updateDetails)

router.delete("/:id",validId, deleteById)

router.patch("/:id/status", validStatus, validId, updateStatus)

export default router