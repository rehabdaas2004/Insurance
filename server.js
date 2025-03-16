const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.static('public')); // Serves static frontend files
app.use(express.json());

// Function to calculate risk score
function calculateRiskScore(age, bmi, bloodPressure, familyHistory) {
    let riskScore = 0;

    // Age Risk
    if (age < 30) riskScore += 0;
    else if (age < 45) riskScore += 10;
    else if (age < 60) riskScore += 20;
    else riskScore += 30;

    // BMI Risk
    if (bmi < 25) riskScore += 0; // Normal
    else if (bmi < 30) riskScore += 30; // Overweight
    else riskScore += 75; // Obese

    // Blood Pressure Risk
    const bpRisk = {
        "normal": 0,
        "elevated": 15,
        "stage1": 30,
        "stage2": 75,
        "crisis": 100
    };
    riskScore += bpRisk[bloodPressure] || 0;

    // Family History Risk
    familyHistory.forEach(disease => {
        if (["diabetes", "cancer", "alzheimer"].includes(disease)) {
            riskScore += 10;
        }
    });

    // Determine Risk Category
    let riskCategory = "low risk";
    if (riskScore > 20) riskCategory = "moderate risk";
    if (riskScore > 50) riskCategory = "high risk";
    if (riskScore > 75) riskCategory = "uninsurable";

    return { riskScore, riskCategory };
}

// API Route for Risk Calculation
app.post('/api/calculate', (req, res) => {
    const { age, weight, height, bloodPressure, familyHistory } = req.body;

    if (!age || !weight || !height || !bloodPressure || !familyHistory) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const bmi = weight / ((height / 100) ** 2);
    const result = calculateRiskScore(age, bmi, bloodPressure, familyHistory);
    
    res.json(result);
});

// Default Route (Serve Frontend)
const path = require('path');

app.use(express.static(path.join(__dirname, 'public'))); 

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.get('/api/test', (req, res) => {
    res.json({ message: "API is working!" });
});
