import { getAllOrders } from './service.js'

export function logger(req, res, next) {
    console.log(req.url, req.method);
    next()
}

export function validation(req, res, next) {
    const { orderId, table, status, customer } = req.body
    if (!orderId || isNaN(+orderId)) {
        const error = new Error("valid orderId is missing")
        error.statusCode = 400
        return next(error)
    }
    if (!table || isNaN(+table) ||  +table <= 0 || +table > 99) {
        const error = new Error("valid table is missing")
        error.statusCode = 400
        return next(error)
    }
    if (!status || typeof status !== "string" || status.trim() === "") {
        const error = new Error("valid status is missing")
        error.statusCode = 400
        return next(error)

    }
    if (!customer || typeof customer !== "string" || customer.trim() === "") {
        const error = new Error("valid customer is missing")
        error.statusCode = 400
        return next(error)

    }
    next()
}

export async function checkId(req, res, next) {
    const orders = await getAllOrders()
    const check = orders.find(o => o.orderId === +req.body.orderId)
    if (check) {
        const error = new Error("orderId is already in use. please choose another id")
        error.statusCode = 422
        return next(error)
    } next()
}