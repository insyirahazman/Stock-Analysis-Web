// Example: js/stock-predictor.js
function loadStockPredictor() {
    const predictorHTML = `
    <div id="stock-predictor">
        <h3>Stock Price Prediction</h3>
        <p><small>Enter historical prices (oldest to newest, minimum 10 recommended):</small></p>
        <textarea id="historical-data" rows="8" placeholder="150.25\n151.30\n149.80\n152.45\n153.10\n..."></textarea><br>
        <button onclick="predictStockPriceLSTM()">Predict Next Price</button>
        <div id="prediction-result" style="margin-top: 15px; padding: 10px; border-radius: 5px;"></div>
        <canvas id="prediction-chart" width="360" height="180"></canvas>
    </div>
    `;
    document.getElementById('chart-predictor-container').innerHTML = predictorHTML;
}

async function predictStockPriceLSTM() {
    const input = document.getElementById('historical-data').value.trim();
    const resultElem = document.getElementById('prediction-result');
    const chartElem = document.getElementById('prediction-chart');
    if (!input) {
        resultElem.innerHTML = '<span style="color: red;">Please enter historical prices.</span>';
        return;
    }
    const prices = input.split('\n').map(line => parseFloat(line)).filter(num => !isNaN(num));
    if (prices.length < 10) {
        resultElem.innerHTML = '<span style="color: red;">Please enter at least 10 valid prices.</span>';
        return;
    }

    // Normalize data
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const normPrices = prices.map(p => (p - min) / (max - min));

    // Prepare training data (window size = 5)
    const windowSize = 5;
    const xs = [];
    const ys = [];
    for (let i = 0; i < normPrices.length - windowSize; i++) {
        xs.push(normPrices.slice(i, i + windowSize));
        ys.push(normPrices[i + windowSize]);
    }
    const xsTensor = tf.tensor2d(xs, [xs.length, windowSize]).reshape([xs.length, windowSize, 1]);
    const ysTensor = tf.tensor2d(ys, [ys.length, 1]);

    // Build LSTM model
    const model = tf.sequential();
    model.add(tf.layers.lstm({units: 8, inputShape: [windowSize, 1]}));
    model.add(tf.layers.dense({units: 1}));
    model.compile({optimizer: 'adam', loss: 'meanSquaredError'});

    // Train model
    resultElem.innerHTML = 'Training LSTM model, please wait...';
    await model.fit(xsTensor, ysTensor, {epochs: 15, batchSize: 4, verbose: 0});

    // Predict next price
    const lastWindow = normPrices.slice(-windowSize);
    const inputTensor = tf.tensor2d(lastWindow, [1, windowSize]).reshape([1, windowSize, 1]);
    const predNorm = model.predict(inputTensor).dataSync()[0];
    const predPrice = predNorm * (max - min) + min;

    resultElem.innerHTML = `<p style="font-size: 16px; margin: 5px 0;">Predicted Next Price: $${predPrice.toFixed(2)}</p>`;

    // Draw chart
    if (window.predictionChart) window.predictionChart.destroy();
    window.predictionChart = new Chart(chartElem, {
        type: 'line',
        data: {
            labels: prices.map(function(_, i) { return 'Day ' + (i + 1); }).concat(['Next']),
            datasets: [
                {
                    label: 'Historical Prices',
                    data: prices.concat([null]),
                    borderColor: '#0074d9',
                    backgroundColor: 'rgba(0, 116, 217, 0.1)',
                    fill: false,
                    pointRadius: 4
                },
                {
                    label: 'LSTM Prediction',
                    data: Array(prices.length).fill(null).concat([predPrice]),
                    borderColor: '#e74c3c',
                    backgroundColor: '#e74c3c',
                    borderDash: [5, 5],
                    pointRadius: 8,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, position: 'top' },
                title: { display: true, text: 'LSTM Stock Price Prediction' }
            },
            scales: {
                x: { title: { display: true, text: 'Time Period' } },
                y: { title: { display: true, text: 'Price ($)' } }
            }
        }
    });
}

if (document.getElementById('chart-predictor-container')) {
    loadStockPredictor();
}