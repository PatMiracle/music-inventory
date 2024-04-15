import dotenv from 'dotenv'

import express from 'express'
import morgan from 'morgan'

dotenv.config({ path: ".env" });

const port = process.env.PORT || 3000

const app = express()

app.use(morgan("dev"))

app.get("/", (req, res)=>{
    res.status(200).send("Hello there!")
})

app.listen(port, ()=> console.log(`server running at port ${port}!`))