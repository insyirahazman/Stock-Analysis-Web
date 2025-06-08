document.getElementById("view-chart").addEventListener("click", function(e) {
    e.stopPropagation();
    const symbol = document.getElementById("stock-symbol").innerText.replace("Symbol:", "").trim();
    const chartCanvas = document.getElementById("stockChart");
    chartCanvas.style.display = "block";

    fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=60&apikey=7f91e7f920cc435b80b5605738ccc713`)
        .then(res => res.json())
        .then(data => {
            if (!data.values) {
                alert("No chart data available.");
                return;
            }
            // Prepare data for line chart
            const labels = data.values.map(v => v.datetime).reverse();
            const closes = data.values.map(v => parseFloat(v.close)).reverse();

            // Optional: Heikin Ashi calculation
            function getHeikinAshi(values) {
                let haData = [];
                let prevHAOpen = (parseFloat(values[0].open) + parseFloat(values[0].close)) / 2;
                for (let i = 0; i < values.length; i++) {
                    let v = values[i];
                    let haClose = (parseFloat(v.open) + parseFloat(v.high) + parseFloat(v.low) + parseFloat(v.close)) / 4;
                    let haOpen = (i === 0) ? prevHAOpen : (haData[i-1].haOpen + haData[i-1].haClose) / 2;
                    haData.push({ haOpen, haClose });
                }
                return haData.map(d => d.haClose).reverse();
            }

            function drawChart(labels, data, label, color) {
                const chartCanvas = document.getElementById("stockChart");
                chartCanvas.style.display = "block";
                if (window.stockChartObj) window.stockChartObj.destroy();
                window.stockChartObj = new Chart(chartCanvas, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: label,
                            data: data,
                            borderColor: color,
                            backgroundColor: "rgba(52,152,219,0.1)",
                            fill: true,
                            tension: 0.2
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: { display: true }
                        },
                        scales: {
                            x: { display: true, title: { display: true, text: "Date" } },
                            y: { display: true, title: { display: true, text: "Price" } }
                        }
                    }
                });
            }

            function fetchAndDrawChart(type) {
                const symbol = document.getElementById("stock-symbol").innerText.replace("Symbol:", "").trim();
                fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=60&apikey=7f91e7f920cc435b80b5605738ccc713`)
                    .then(res => res.json())
                    .then(data => {
                        if (!data.values) {
                            alert("No chart data available.");
                            return;
                        }
                        const labels = data.values.map(v => v.datetime).reverse();
                        if (type === "heikin") {
                            const haData = getHeikinAshi(data.values);
                            drawChart(labels, haData, "Heikin Ashi Close", "#e67e22");
                        } else {
                            const closes = data.values.map(v => parseFloat(v.close)).reverse();
                            drawChart(labels, closes, "Close Price", "#3498db");
                        }
                    });
            }

            // Toggle between line and Heikin Ashi
            let chartType = "line"; // or "heikin"
            let chartData = closes;
            if (window.confirm("Show Heikin Ashi chart? (Cancel for normal line chart)")) {
                chartType = "heikin";
                chartData = getHeikinAshi(data.values);
            }

            // Destroy previous chart if exists
            if (window.stockChartObj) window.stockChartObj.destroy();

            window.stockChartObj = new Chart(chartCanvas, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: chartType === "heikin" ? "Heikin Ashi Close" : "Close Price",
                        data: chartData,
                        borderColor: chartType === "heikin" ? "#e67e22" : "#3498db",
                        backgroundColor: "rgba(52,152,219,0.1)",
                        fill: true,
                        tension: 0.2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: true }
                    },
                    scales: {
                        x: { display: true, title: { display: true, text: "Date" } },
                        y: { display: true, title: { display: true, text: "Price" } }
                    }
                }
            });
        });
});

document.getElementById("view-line-chart").addEventListener("click", function(e) {
    e.stopPropagation();
    fetchAndDrawChart("line");
});
document.getElementById("view-heikin-chart").addEventListener("click", function(e) {
    e.stopPropagation();
    fetchAndDrawChart("heikin");
});