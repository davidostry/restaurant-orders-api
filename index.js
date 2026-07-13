import express from 'express'
import orderRouter from './orderRouter.js'
import {logger} from './middleware.js'
const port = process.env.PORT

const app = express()

app.use(express.json())

app.use(logger)

app.use("/orders", orderRouter)


app.use((error, req, res, next)=>{
    res.status(error.statusCode || 500).json(error || "something went wrong")
})

app.listen(port, ()=>{
console.log("server  is runing...");

})