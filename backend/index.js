import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js"; // Importing PORT and mongoDBURL from config.js
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1 : Allow All Origins with Default of cors(*)
app.use(cors());

//Option 2: Allow custom Origins
// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['content-Type'],
//     })
// )


app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("welcome back to the channel guys");
})


app.use('/books',booksRoute);

// Connecting to the MongoDB database
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Database connected successfully");
        // Starting the Express server after successfully connecting to the database
        app.listen(PORT, () => {
            console.log(`App is listening at port no ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

