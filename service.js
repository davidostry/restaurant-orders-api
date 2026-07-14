import { readFile, writeFile } from './repository.js'


export async function getAllOrders() {
    try {
        const allOrders = await readFile()
        return allOrders;

    } catch (error) {
        console.log(error.message);
        throw new Error("failed to read orders");


    }
}

export async function filter(parameters) {
    let result = await getAllOrders()
    const { status, customer, table, orderId } = parameters
    if (status) {
        const statuses = ["NEW", "PREPARING", "READY", "DELIVERED", "CANCELLED"]
        if (!statuses.includes(status.toUpperCase())) {
            return false
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
    return result
}

export async function saveOrders(orders) {
    try {
        await writeFile(orders)
        console.log("edited file");

    } catch (error) {
        console.log(error.message);
        throw new Error("failed to edit orders");


    }
}

export async function getById(id) {
    const orders = await getAllOrders()
    const order = orders.find(o => o.orderId === +id)
    return order
}


export async function deleteOrder(id) {
    const order = await getById(id)
    if (!order) return false
    const orders = await getAllOrders()
    const orderIndex = orders.findIndex(o => o.orderId === +id)
    orders.splice(orderIndex, 1)
    await saveOrders(orders)
    return true
}
export async function updateOrder(id, parameters) {
    const orders = await getAllOrders()
    const order = orders.find(o => o.orderId === +id)
    if (!order) return false
    const { customer, table, status } = parameters
    if (customer) order.customer = customer
    if (table) order.table = table
    if (status) {
        if (order.status.toUpperCase() === "NEW" && status.toUpperCase() === "PREPARING"
            || order.status.toUpperCase() === "NEW" && status.toUpperCase() === "CANCELLED"
            || order.status.toUpperCase() === "PREPARING" && status.toUpperCase() === "READY"
            || order.status.toUpperCase() === "READY" && status.toUpperCase() === "DELIVERED"
            || order.status.toUpperCase() === "PREPARING" && status.toUpperCase() === "CANCELLED") {
            order.status = status
        }
    }
    await saveOrders(orders)
    return order
}


