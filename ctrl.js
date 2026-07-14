import { getAllOrders, filter, saveOrders, getById, deleteOrder, updateOrder } from './service.js'

export async function addOrder(req, res, next) {
    try {
        const { orderId, table, customer } = req.body;
        const order = {
            orderId,
            table,
            status: process.env.STATUS,
            customer
        };
        const orders = await getAllOrders();
        orders.push(order);
        await saveOrders(orders);

        return res.status(201).json({
            message: "Order added successfully",
            data: order
        });
    } catch (error) {
        next(error);


    }
}

export async function getOrders(req, res, next) {
    try {
        const parameters = req.query
        const result =await filter(parameters)
        if (!result) return res.status(400).json({message: "invalid status"})
        return res.json({ data: result })
    } catch (error) {
        next(error)
    }
}

export async function getOrder(req, res, next) {
    try {
        const id = req.params.id;
        const result = await getById(id)
        if (!result) return res.status(404).json({ message: `orderId:${id} not found` })
        return res.json({ data: result })
    } catch (error) {
        next(error)
    }
    
}

export async function deleteById(req, res, next) {
    try {
        const id = req.params.id
        const result = await deleteOrder(id)
        if (!result) return res.status(404).json({ message: `orderId:${id} not found` })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}

export async function updateDetails(req, res, next) {
    try {
        const id = req.params.id
        const parameters = req.body
        const order = await updateOrder(id, parameters)
        if (!order) return res.status(404).json({ message: `orderId:${id} not found` })
        return res.json({ data: order })
    } catch (error) {
        next(error)
    }
}
export async function updateStatus(req, res, next) {
    try {
        const { id } = req.params
        const { status } = req.body
        console.log(id, status);

        const order = await updateOrder(id, { status })
        if (!order) return res.status(404).json({ message: `orderId:${id} not found` })
        return res.json({ data: order })
    } catch (error) {
        next(error)
    }
}
