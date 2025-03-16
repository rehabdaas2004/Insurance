const apiURL = "https://insuranceriskcalculator-gpdzg6epg6dad9cn.uaenorth-01.azurewebsites.net/"; // Update this with your Web App URL

document.getElementById("riskForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const bloodPressure = document.getElementById("bloodPressure").value;
    const familyHistory = Array.from(document.querySelectorAll('input[name="familyHistory"]:checked'))
                               .map(el => el.value);

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ age, weight, height, bloodPressure, familyHistory })
        });

        const data = await response.json();
        document.getElementById("result").innerText = `Risk Level: ${data.riskCategory}`;
    } catch (error) {
        document.getElementById("result").innerText = "Error: Could not fetch data";
        console.error("API Fetch Error:", error);
    }
});
