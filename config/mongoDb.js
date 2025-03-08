import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async() => {
    mongoose.connection.on('connected', () => {
        console.log('db connected')
    })
    await mongoose.connect(process.env.MONGO_DB_URL)
        .then(() => {
            console.log('Successfully connected to MongoDB Atlas!');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB Atlas:', error);
        });
}

export default connectDb