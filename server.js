const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

async function startServer() {
    await client.connect();

    const db = client.db("studentPortfolioDB");
    const portfolios = db.collection("portfolios");

    app.get("/", (req, res) => {
        res.json({
            message: "Portfolio backend is running!"
        });
    });

    app.post("/api/portfolio", async (req, res) => {
        try {
            const portfolioData = req.body;

            const result = await portfolios.insertOne({
                ...portfolioData,
                createdAt: new Date()
            });

            res.status(201).json({
                message: "Portfolio saved successfully!",
                id: result.insertedId
            });

        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Failed to save portfolio"
            });
        }
    });

    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer().catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
});
