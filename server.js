const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Portfolio backend is running!"
    });
});

// Portfolio data receive route
app.post("/api/portfolio", (req, res) => {
    const portfolioData = req.body;

    console.log("Portfolio data received:");
    console.log(portfolioData);

    res.status(201).json({
        message: "Portfolio data received successfully!",
        data: portfolioData
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
