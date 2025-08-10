// Example: js/stock-predictor.js
function loadStockPredictor() {
    const predictorHTML = `
    <div id="stock-predictor">
        <h3>Stock Price Prediction</h3>
        <p><small>Using Moving Average + Trend Analysis</small></p>
        <textarea id="historical-data" rows="6" placeholder="Enter historical prices (OLDEST to NEWEST) minimum 10 prices recommended:
150.25
151.30  
149.80
152.45
153.10
"></textarea><br>

        <div style="margin: 10px 0;">
            <label>Choose Prediction Method: </label>
            <select id="prediction-method">
                <option value="advanced">Advanced (Moving Average + Trend)</option>
                <option value="conservative">Conservative (Weighted Average)</option>
                <option value="aggressive">Aggressive (Momentum Based)</option>
            </select>
        </div>
        <button onclick="predictStockPrice()">Predict Next Price</button>
        <div id="prediction-result" style="margin-top: 15px; padding: 10px; border-radius: 5px;"></div>
        <canvas id="prediction-chart" width="360" height="180"></canvas>
    </div>
    `;
    document.getElementById('chart-predictor-container').innerHTML = predictorHTML;
}

// Advanced prediction algorithm combining multiple techniques
function predictStockPrice() {
    const input = document.getElementById('historical-data').value.trim();
    const resultElem = document.getElementById('prediction-result');
    const chartElem = document.getElementById('prediction-chart');
    const method = document.getElementById('prediction-method').value;
    
    if (!input) {
        resultElem.innerHTML = '<span style="color: red;">Please enter historical prices.</span>';
        return;
    }
    
    const prices = input.split('\n').map(line => parseFloat(line)).filter(num => !isNaN(num));
    if (prices.length < 5) {
        resultElem.innerHTML = '<span style="color: red;">Please enter at least 5 valid prices for accurate prediction.</span>';
        return;
    }

    let prediction, confidence, analysis;
    
    switch(method) {
        case 'advanced':
            ({ prediction, confidence, analysis } = advancedMovingAveragePrediction(prices));
            break;
        case 'conservative':
            ({ prediction, confidence, analysis } = conservativeWeightedPrediction(prices));
            break;
        case 'aggressive':
            ({ prediction, confidence, analysis } = aggressiveMomentumPrediction(prices));
            break;
    }

    // Display results with confidence and analysis
    const changePercent = ((prediction - prices[prices.length - 1]) / prices[prices.length - 1] * 100).toFixed(2);
    const confidenceColor = confidence > 70 ? 'green' : confidence > 50 ? 'orange' : 'red';
    
    resultElem.innerHTML = `
        <div style="background: #f0f8ff; border-left: 4px solid rgb(30, 66, 77); padding: 10px;">
            <p><strong>Predicted Next Price:</strong> <span style="font-size: 16px; margin: 5px 0;">$${prediction.toFixed(2)}</span></p>
            <p><strong>Change:</strong> ${changePercent > 0 ? '+' : ''}${changePercent}% from current price</p>
            <p><strong>Confidence:</strong> <span style="color: ${confidenceColor};">${confidence.toFixed(1)}%</span></p>
            <p><strong>Analysis:</strong> ${analysis}</p>
        </div>
    `;

    drawAdvancedChart(prices, prediction, method);
}

// Advanced Moving Average + Trend Analysis
function advancedMovingAveragePrediction(prices) {
    const sma5 = simpleMovingAverage(prices, 5);
    const sma10 = simpleMovingAverage(prices, Math.min(10, Math.floor(prices.length / 2)));
    const ema = exponentialMovingAverage(prices, 5);
    const trend = calculateTrend(prices);
    const volatility = calculateVolatility(prices);
    
    // Combine multiple indicators
    const prediction = (sma5 * 0.4 + ema * 0.4 + trend * 0.2);
    
    // Calculate confidence based on trend consistency and volatility
    const trendStrength = Math.abs(trend - prices[prices.length - 1]) / prices[prices.length - 1];
    const confidence = Math.max(30, Math.min(85, 80 - (volatility * 100) + (trendStrength * 20)));
    
    const analysis = generateAnalysis(prices, sma5, sma10, trend, volatility);
    
    return { prediction, confidence, analysis };
}

// Conservative Weighted Average
function conservativeWeightedPrediction(prices) {
    const weights = prices.map((_, i) => Math.pow(1.2, i)); // Recent prices get higher weight
    const weightedSum = prices.reduce((sum, price, i) => sum + (price * weights[i]), 0);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const prediction = weightedSum / totalWeight;
    
    const volatility = calculateVolatility(prices);
    const confidence = Math.max(40, Math.min(75, 70 - (volatility * 80)));
    
    const analysis = `Conservative approach using weighted average. Lower risk prediction based on recent price stability.`;
    
    return { prediction, confidence, analysis };
}

// Aggressive Momentum-Based Prediction
function aggressiveMomentumPrediction(prices) {
    const recentTrend = calculateTrend(prices.slice(-5));
    const momentum = calculateMomentum(prices);
    const currentPrice = prices[prices.length - 1];
    
    const prediction = currentPrice + (recentTrend * 1.5) + (momentum * 0.3);
    
    const volatility = calculateVolatility(prices);
    const confidence = Math.max(25, Math.min(70, 60 - (volatility * 60)));
    
    const analysis = `Aggressive prediction based on recent momentum and trend acceleration. Higher potential returns but increased risk.`;
    
    return { prediction, confidence, analysis };
}

// Helper functions for technical analysis
function simpleMovingAverage(prices, period) {
    const slice = prices.slice(-period);
    return slice.reduce((sum, price) => sum + price, 0) / slice.length;
}

function exponentialMovingAverage(prices, period) {
    const multiplier = 2 / (period + 1);
    let ema = prices[0];
    for (let i = 1; i < prices.length; i++) {
        ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
    }
    return ema;
}

function calculateTrend(prices) {
    if (prices.length < 3) return prices[prices.length - 1];
    
    const recent = prices.slice(-5);
    const older = prices.slice(-10, -5);
    
    const recentAvg = recent.reduce((sum, p) => sum + p, 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((sum, p) => sum + p, 0) / older.length : recentAvg;
    
    return recentAvg + (recentAvg - olderAvg);
}

function calculateVolatility(prices) {
    if (prices.length < 2) return 0;
    
    const returns = [];
    for (let i = 1; i < prices.length; i++) {
        returns.push((prices[i] - prices[i-1]) / prices[i-1]);
    }
    
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
    
    return Math.sqrt(variance);
}

function calculateMomentum(prices) {
    if (prices.length < 5) return 0;
    
    const recent = prices.slice(-3);
    const earlier = prices.slice(-6, -3);
    
    const recentAvg = recent.reduce((sum, p) => sum + p, 0) / recent.length;
    const earlierAvg = earlier.reduce((sum, p) => sum + p, 0) / earlier.length;
    
    return recentAvg - earlierAvg;
}

function generateAnalysis(prices, sma5, sma10, trend, volatility) {
    const currentPrice = prices[prices.length - 1];
    const priceChange = ((currentPrice - prices[0]) / prices[0] * 100).toFixed(1);
    
    let analysis = "";
    
    if (currentPrice > sma5 && sma5 > sma10) {
        analysis += "Bullish trend detected. ";
    } else if (currentPrice < sma5 && sma5 < sma10) {
        analysis += "Bearish trend detected. ";
    } else {
        analysis += "Sideways movement observed. ";
    }
    
    if (volatility < 0.02) {
        analysis += "Low volatility suggests stable price action.";
    } else if (volatility < 0.05) {
        analysis += "Moderate volatility indicates normal market conditions.";
    } else {
        analysis += "High volatility suggests increased uncertainty.";
    }
    
    analysis += ` Overall trend: ${priceChange > 0 ? '+' : ''}${priceChange}% over period.`;
    
    return analysis;
}

function drawAdvancedChart(prices, prediction, method) {
    const chartElem = document.getElementById('prediction-chart');
    if (window.predictionChart) window.predictionChart.destroy();
    
    const labels = prices.map((_, i) => `Day ${i + 1}`).concat([`Day ${prices.length + 1}`]);
    const sma5 = prices.map((_, i) => i >= 4 ? simpleMovingAverage(prices.slice(0, i + 1), 5) : null);
    
    window.predictionChart = new Chart(chartElem, {
        type: 'line',
        data: {
            labels: labels,
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
                    label: '5-Period SMA',
                    data: sma5.concat([null]),
                    borderColor: '#2ecc71',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 2
                },
                {
                    label: `${method.charAt(0).toUpperCase() + method.slice(1)} Prediction`,
                    data: Array(prices.length).fill(null).concat([prediction]),
                    borderColor: '#e74c3c',
                    backgroundColor: '#e74c3c',
                    borderDash: [5, 5],
                    pointRadius: 8,
                    pointStyle: 'star',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Advanced Stock Price Prediction Analysis'
                }
            },
            scales: {
                x: { 
                    title: { display: true, text: 'Time Period' }
                },
                y: { 
                    title: { display: true, text: 'Price ($)' }
                }
            }
        }
    });
}

if (document.getElementById('chart-predictor-container')) {
    loadStockPredictor();
}