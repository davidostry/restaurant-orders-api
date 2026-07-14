import { getAllOrders } from './service.js'

export function logger(req, res, next) {
    console.log(req.url, req.method);
    next()
}

export function validation(req, res, next) {
    const { orderId, table, customer } = req.body
    if (!orderId || isNaN(+orderId)) {
        const error = new Error("valid orderId is missing")
        error.statusCode = 400
        return next(error)
    }
    if (!table || isNaN(+table) || +table <= 0 || +table > 99) {
        const error = new Error("valid table is missing")
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
    try {
        const orders = await getAllOrders();
        const check = orders.find(o => o.orderId === +req.body.orderId)
        if (check) {
            const error = new Error("orderId is already in use. please choose another id");
            error.statusCode = 422;
            return next(error);
        } next();
    } catch (error) {
        next(error);

    }
}

export function validId(req, res, next){
    const { id } = req.params
    if (!id || isNaN(+id) || +id < 0){
        const error = new Error("orderId is not valid")
        error.statusCode = 400
        return next(error)
    }
    next()

}

export function validStatus(req, res, next){
    const { status } = req.body
    const statuses = ["NEW", "PREPARING", "READY", "DELIVERED", "CANCELLED"]
    if (!status || !statuses.includes(status.toUpperCase()) ){
        const error = new Error("status is not valid")
        error.statusCode = 400
        return next(error)
    }
    next()
}