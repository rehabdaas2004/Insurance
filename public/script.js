document.getElementById("riskForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);

    // Convert height from cm to meters
    height = height / 100;

    const bloodPressure = document.getElementById("bloodPressure").value;

    const familyHistory = Array.from(document.querySelectorAll("input[type=checkbox]:checked"))
                               .map(input => input.value);

    try {
        console.log("Sending request with:", { age, weight, height, bloodPressure, familyHistory });

        const response = await fetch("http://localhost:5000/calculate-risk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ age, weight, height, bloodPressure, familyHistory })
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Received response:", result);

        document.getElementById("result").innerText = `Risk Score: ${result.riskScore} (${result.category})`;
    } catch (error) {
        console.error("Error occurred:", error);
        document.getElementById("result").innerText = "Error: Could not fetch data";
    }
});
