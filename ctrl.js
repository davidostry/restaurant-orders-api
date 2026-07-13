import { getAllOrders, saveOrders } from './service.js'

export async function addOrder(req, res, next) {
    try {
        const { orderId, table, status, customer } = req.body;
        const order = {
            orderId,
            table,
            status,
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
        let result = await getAllOrders()
        const { status, customer, table, orderId } = req.query
        if (status) {
            const statuses = ["NEW", "PREPARING", "READY", "DELIVERED", "CANCELLED"]
            if (!statuses.includes(status.toUpperCase())) {
                return res.status(400).json({ message: "invalid status" })
            }
            result = result.filter(o => o.status.toUpperCase() === status.toUpperCase())
        }
        if (customer) {
            result = result.filter(o => o.customer.toUpperCase() === customer.toUpperCase())
        }
        if (table) {
            result = result.filter(o => o.table === +table)
        }
        if (orderId) {
            result = result.filter(o => o.orderId === +orderId);
        }
        return res.json({ data: result })
    } catch (error) {
        next(error)
    }
}