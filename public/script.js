document.getElementById("riskForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const bloodPressure = document.getElementById("bloodPressure").value;

    // Get family history
    const familyHistory = Array.from(document.querySelectorAll("input[type=checkbox]:checked"))
                               .map(input => input.value);

    const response = await fetch("http://localhost:5000/calculate-risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, weight, height, bloodPressure, familyHistory })
    });

    const result = await response.json();
    document.getElementById("result").innerText = `Risk Score: ${result.riskScore} (${result.category})`;
});
