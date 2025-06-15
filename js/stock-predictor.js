// Example: js/stock-predictor.js
function loadStockPredictor() {
    const predictorHTML = `
    <div id="stock-predictor">
        <h3>Stock Price Prediction</h3>
        <textarea id="historical-data" rows="5" placeholder="Enter historical prices, one per line"></textarea><br>
        <button onclick="predictStockPrice()">Predict Next Price</button>
        <p id="prediction-result"></p>
        <canvas id="prediction-chart" width="360" height="180"></canvas>
    </div>
    `;
    document.getElementById('chart-predictor-container').innerHTML = predictorHTML;
}

function predictStockPrice() {
    const input = document.getElementById('historical-data').value.trim();
    const resultElem = document.getElementById('prediction-result');
    const chartElem = document.getElementById('prediction-chart');
    if (!input) {
        resultElem.innerText = "Please enter historical prices.";
        return;
    }
    const lines = input.split('\n').map(line => parseFloat(line)).filter(num => !isNaN(num));
    if (lines.length < 2) {
        resultElem.innerText = "Please enter at least two valid prices.";
        return;
    }

    // Prepare data for regression
    const data = lines.map((price, idx) => [idx + 1, price]);
    const result = regression.linear(data);
    const nextX = data.length + 1;
    const nextPrice = result.predict(nextX)[1];

    resultElem.innerText = "Predicted next price: " + nextPrice.toFixed(2);

    // Draw chart
    if (window.predictionChart) window.predictionChart.destroy();
    window.predictionChart = new Chart(chartElem, {
        type: 'line',
        data: {
            labels: data.map(d => d[0]).concat([nextX]),
            datasets: [
                {
                    label: 'Historical',
                    data: data.map(d => d[1]),
                    borderColor: '#0074d9',
                    fill: false
                },
                {
                    label: 'Prediction',
                    data: Array(data.length).fill(null).concat([nextPrice]),
                    borderColor: '#ff4136',
                    borderDash: [5, 5],
                    fill: false
                }
            ]
        },
        options: {
            responsive: false,
            plugins: {
                legend: { display: true }
            },
            scales: {
                x: { title: { display: true, text: 'Day' } },
                y: { title: { display: true, text: 'Price' } }
            }
        }
    });
}

if (document.getElementById('chart-predictor-container')) {
    loadStockPredictor();
}