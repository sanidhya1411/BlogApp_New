import express from 'express';
import mongoose from 'mongoose';
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use('/api/user', router);
app.use('/api/blog', blogRouter);

mongoose.connect(DATABASE_URL).then(() => console.log("connected to database")).catch((err) => console.log(err));

app.use("/api", (req, res, next) => {
    res.send("hello world");
});

app.listen(`${PORT}`);