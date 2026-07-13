import express from 'express'
import {validation, checkId} from './middleware.js'
import {addOrder, getOrders} from './ctrl.js'

const router = express.Router()

router.post("/", validation, checkId ,addOrder)

router.get("/", getOrders)

// router.get("/:id")

// router.put("/:id")

// router.delete("/:id")

// router.patch("/:id/status")

export default router