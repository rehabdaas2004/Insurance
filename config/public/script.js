document.getElementById('riskForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;
    const bloodPressure = document.getElementById('bloodPressure').value;
    
    const familyHistory = [];
    if (document.getElementById('diabetes').checked) familyHistory.push('diabetes');
    if (document.getElementById('cancer').checked) familyHistory.push('cancer');
    if (document.getElementById('alzheimers').checked) familyHistory.push('alzheimers');

    const response = await fetch('https://your-api-endpoint/risk', {  // Change this URL to your API endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, weight, height, bloodPressure, familyHistory })
    });

    const data = await response.json();
    document.getElementById('result').textContent = `Your risk category is: ${data.risk}`;
});
