let chart;

function calculateFootprint() {

    const electricity =
        Number(document.getElementById("electricity").value);

    const travel =
        Number(document.getElementById("travel").value);

    const waste =
        Number(document.getElementById("waste").value);

    const food =
        Number(document.getElementById("diet").value);

    const energyScore =
        Math.round(electricity * 0.4 * 12);

    const transportScore =
        Math.round(travel * 0.17 * 52);

    const wasteScore =
        Math.round(waste * 2.5 * 52);

    const foodScore = food;

    const total =
        energyScore +
        transportScore +
        wasteScore +
        foodScore;

    document.getElementById(
        "totalFootprint"
    ).innerHTML =
        `Your Carbon Footprint: ${total.toLocaleString()} kg CO₂e/year`;

    showHistory(total);

    showRecommendations(
        energyScore,
        transportScore,
        foodScore,
        wasteScore
    );

    drawChart(
        energyScore,
        transportScore,
        foodScore,
        wasteScore
    );

    localStorage.setItem(
        "lastFootprint",
        total
    );
}

function showHistory(total){

    const previous =
        localStorage.getItem("lastFootprint");

    if(previous){

        const diff =
            previous - total;

        document.getElementById(
            "historyBox"
        ).innerHTML =

        `
        <h3>📈 Carbon History</h3>

        <p>
        Previous Assessment:
        ${Number(previous).toLocaleString()} kg CO₂e/year
        </p>

        <p>
        Current Assessment:
        ${total.toLocaleString()} kg CO₂e/year
        </p>

        <p>
        Improvement:
        ${diff > 0 ? diff : 0} kg CO₂e/year
        </p>
        `;
    }
}

function showRecommendations(
    energy,
    transport,
    food,
    waste
){

    const maxValue =
        Math.max(
            energy,
            transport,
            food,
            waste
        );

    let recommendation = "";

    if(maxValue === transport){

        recommendation =
        `
        🚗 Transportation is your biggest source of emissions.

        <br><br>

        Suggested Actions:

        <ul>
        <li>Use public transport</li>
        <li>Carpool regularly</li>
        <li>Walk for short trips</li>
        </ul>
        `;
    }

    else if(maxValue === energy){

        recommendation =
        `
        ⚡ Electricity consumption contributes most.

        <br><br>

        Suggested Actions:

        <ul>
        <li>Use LED lighting</li>
        <li>Switch off unused appliances</li>
        <li>Choose efficient devices</li>
        </ul>
        `;
    }

    else if(maxValue === food){

        recommendation =
        `
        🌾 Diet contributes most to your footprint.

        <br><br>

        Suggested Actions:

        <ul>
        <li>Reduce meat consumption</li>
        <li>Try plant-based meals</li>
        <li>Reduce food waste</li>
        </ul>
        `;
    }

    else{

        recommendation =
        `
        🗑 Waste generation contributes most.

        <br><br>

        Suggested Actions:

        <ul>
        <li>Recycle materials</li>
        <li>Compost organic waste</li>
        <li>Avoid single-use plastics</li>
        </ul>
        `;
    }

    document.getElementById(
        "recommendationBox"
    ).innerHTML = recommendation;
}

function drawChart(
    energy,
    transport,
    food,
    waste
){

    const ctx =
        document.getElementById(
            "footprintChart"
        );

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [
                "Energy",
                "Transport",
                "Food",
                "Waste"
            ],

            datasets: [{
                data: [
                    energy,
                    transport,
                    food,
                    waste
                ]
            }]
        }
    });
}

function simulateReduction(){

    const text =
        document.getElementById(
            "totalFootprint"
        ).innerText;

    const current =
        Number(
            text.replace(/[^0-9]/g,'')
        );

    if(!current){

        document.getElementById(
            "simulationResult"
        ).innerHTML =
        "Calculate your footprint first.";

        return;
    }

    const reduced =
        Math.round(current * 0.75);

    document.getElementById(
        "simulationResult"
    ).innerHTML =

    `
    Current Footprint:
    ${current.toLocaleString()} kg CO₂e/year

    <br><br>

    Projected Footprint:
    ${reduced.toLocaleString()} kg CO₂e/year

    <br><br>

    Potential Reduction:
    ${(current-reduced).toLocaleString()} kg CO₂e/year
    `;
}