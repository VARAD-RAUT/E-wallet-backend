import express from "express";
import dotenv from "dotenv";
// import {sql} from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import {initDB} from "./config/db.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

if(process.env.NODE_ENV === "production") job.start();
// middleware - is a function that runs in middle between the request and response. It is important for authetication check.

app.use(ratelimiter);

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
    res.status(200).json({status: "ok"})
});


app.use("/api/transactions", transactionsRoute)





initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});





