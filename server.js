import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import connectCloudinary from './config/cloudinary.js'
import connectDb from './config/mongoDb.js'
const app = express()
const port = process.env.PORT || 3000
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js';

connectDb()
connectCloudinary()
dotenv.config();

app.use(express.json())

app.use(cors())


app.use('/api/user', userRouter)
app.use('/api/product', productRouter)







app.get('/', (req, res) => {
    res.send('hello seddik ')
})

app.listen(port, () => console.log(`server is runnig on port ${port}`))