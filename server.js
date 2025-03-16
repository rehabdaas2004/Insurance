const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
    origin: '*',  // Allows requests from anywhere (adjust if needed)
    methods: ['GET', 'POST']
}));
app.use(express.json());

// Default route to prevent permission error
app.get("/", (req, res) => {
    res.send("Server is running. API is available.");
});

// API Route to calculate insurance risk
app.post('/calculate', (req, res) => {
    const { age, weight, height, bloodPressure, familyHistory } = req.body;

    if (!age || !weight || !height || !bloodPressure) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // BMI Calculation
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Risk Calculation Logic
    let riskScore = 0;

    // Age Risk
    if (age < 30) riskScore += 0;
    else if (age < 45) riskScore += 10;
    else if (age < 60) riskScore += 20;
    else riskScore += 30;

    // BMI Risk
    if (bmi < 25) riskScore += 0;
    else if (bmi < 30) riskScore += 30;
    else riskScore += 75;

    // Blood Pressure Risk
    const bloodPressureRisk = {
        "normal": 0,
        "elevated": 15,
        "stage 1": 30,
        "stage 2": 75,
        "crisis": 100
    };
    riskScore += bloodPressureRisk[bloodPressure] || 0;

    // Family Disease Risk
    if (familyHistory.includes("diabetes")) riskScore += 10;
    if (familyHistory.includes("cancer")) riskScore += 10;
    if (familyHistory.includes("Alzheimer’s")) riskScore += 10;

    // Risk Category
    let riskCategory = "uninsurable";
    if (riskScore <= 20) riskCategory = "low risk";
    else if (riskScore <= 50) riskCategory = "moderate risk";
    else if (riskScore <= 75) riskCategory = "high risk";

    res.json({ bmi, riskScore, riskCategory });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
