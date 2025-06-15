// Twelve Data apiKey
const apiKey = '7f91e7f920cc435b80b5605738ccc713';
const stocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "GOOGL", name: "Alphabet Inc." },
    { symbol: "AMZN", name: "Amazon.com Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
    { symbol: "NVDA", name: "NVIDIA Corp." }
];

function getStockData(symbol) {
    [
        "stock-title", "stock-symbol", "stock-price", "stock-change", "stock-volume",
        "stock-market-cap", "stock-pe-ratio", "stock-dividend-yield",
        "stock-52-week-high", "stock-52-week-low", "stock-description"
    ].forEach(id => document.getElementById(id).innerText = "Loading...");

    let found = false;

    // 1. QUOTE: Name, Symbol, Market Cap, PE, Dividend, 52W High/Low
    fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data && !data.status) {
                found = true;
                document.getElementById("stock-title").innerText = data.name || symbol;
                document.getElementById("stock-symbol").innerText = `Symbol: ${data.symbol || symbol}`;
                document.getElementById("stock-market-cap").innerText = `Market Cap: ${data.market_cap || "N/A"}`;
                document.getElementById("stock-pe-ratio").innerText = `PE Ratio: ${data.pe || "N/A"}`;
                document.getElementById("stock-dividend-yield").innerText = `Dividend Yield: ${data.dividend_yield || "N/A"}`;
                document.getElementById("stock-52-week-high").innerText = `52 Week High: ${data.fifty_two_week?.high || "N/A"}`;
                document.getElementById("stock-52-week-low").innerText = `52 Week Low: ${data.fifty_two_week?.low || "N/A"}`;
            }
        })
        .catch(() => {});

    // 2. TIME SERIES: Price, Change, Volume
    fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data && !data.status) {
                found = true;
                const value = data.values && data.values[0] ? data.values[0] : {};
                document.getElementById("stock-price").innerText = `Price: $${value.close || "N/A"}`;
                const change = value.close && value.open ? (parseFloat(value.close) - parseFloat(value.open)).toFixed(2) : "N/A";
                document.getElementById("stock-change").innerText = `Change: $${change}`;
                document.getElementById("stock-volume").innerText = `Volume: ${value.volume || "N/A"}`;
            }
        })
        .catch(() => {});

    // 3. PROFILE: Description
    fetch(`https://api.twelvedata.com/profile?symbol=${symbol}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data && !data.status) {
                found = true;
                document.getElementById("stock-description").innerText = `Description: ${data.description || "N/A"}`;
            }
        })
        .catch(() => {});

    setTimeout(() => {
        if (!found) {
            document.getElementById("stock-title").innerText = "Stock not found.";
        }
    }, 1500);
}

window.onload = function() {
    getStockData(symbol);
}

document.addEventListener("DOMContentLoaded", function() {
    const box = document.getElementById("stock-box");
    const details = document.getElementById("stock-details");
    if (box && details) {
        box.addEventListener("click", function() {
            details.style.display = details.style.display === "none" ? "block" : "none";
        });
    }
});