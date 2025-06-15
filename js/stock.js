// Twelve Data apiKey
const apiKey = '7f91e7f920cc435b80b5605738ccc713';
const stocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
    { symbol: "NVDA", name: "NVIDIA Corp." }
];

function fetchStockDetails(symbol, unique) {
    // Set loading text for all fields
    [
        "stock-title", "stock-symbol", "stock-price", "stock-change", "stock-volume",
        "stock-market-cap", "stock-pe-ratio", "stock-dividend-yield",
        "stock-52-week-high", "stock-52-week-low", "stock-description"
    ].forEach(id => {
        const el = document.getElementById(`${id}-${unique}`);
        if (el) el.innerText = "Loading...";
    });

    // 1. QUOTE: Name, Symbol, Market Cap, PE, Dividend, 52W High/Low
    fetch(`https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data && !data.status) {
                document.getElementById(`stock-title-${unique}`).innerText = data.name || symbol;
                document.getElementById(`stock-symbol-${unique}`).innerText = `Symbol: ${data.symbol || symbol}`;
                document.getElementById(`stock-market-cap-${unique}`).innerText = `Market Cap: ${data.market_cap || "N/A"}`;
                document.getElementById(`stock-pe-ratio-${unique}`).innerText = `PE Ratio: ${data.pe || "N/A"}`;
                document.getElementById(`stock-dividend-yield-${unique}`).innerText = `Dividend Yield: ${data.dividend_yield || "N/A"}`;
                document.getElementById(`stock-52-week-high-${unique}`).innerText = `52 Week High: ${data.fifty_two_week?.high || "N/A"}`;
                document.getElementById(`stock-52-week-low-${unique}`).innerText = `52 Week Low: ${data.fifty_two_week?.low || "N/A"}`;
            } else {
                document.getElementById(`stock-title-${unique}`).innerText = "Stock not found.";
            }
        });

    // 2. TIME SERIES: Price, Change, Volume
    fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data && !data.status) {
                const value = data.values && data.values[0] ? data.values[0] : {};
                document.getElementById(`stock-price-${unique}`).innerText = `Price: $${value.close || "N/A"}`;
                const change = value.close && value.open ? (parseFloat(value.close) - parseFloat(value.open)).toFixed(2) : "N/A";
                document.getElementById(`stock-change-${unique}`).innerText = `Change: $${change}`;
                document.getElementById(`stock-volume-${unique}`).innerText = `Volume: ${value.volume || "N/A"}`;
            }
        });

    // 3. PROFILE: Description
    fetch(`https://api.twelvedata.com/profile?symbol=${symbol}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data && !data.status) {
                document.getElementById(`stock-description-${unique}`).innerText = `Description: ${data.description || "N/A"}`;
            }
        });
}

function createStockBox(stock, unique) {
    return `
        <div class="stock-box" id="stock-box-${unique}" style="cursor:pointer">
            <h4 id="stock-title-${unique}">${stock.name} (${stock.symbol})</h4>
            <p id="stock-price-${unique}">Loading...</p>
            <p id="stock-change-${unique}">Loading...</p>
            <p id="stock-volume-${unique}">Loading...</p>
            <div class="stock-box-btn1">
                <button type="button" class="add-watchlist-btn" data-symbol="${stock.symbol}" data-name="${stock.name}">Add to Watchlist</button>
            </div>
            <div class="stock-chart-btn2">
                <button type="button" onclick="window.location.href='chart.html?symbol=${stock.symbol}&name=${encodeURIComponent(stock.name)}'">View Chart</button>
            </div>
            <div id="stock-details-${unique}" style="display:none; margin-top:10px;">
                <p id="stock-market-cap-${unique}">Loading...</p>
                <p id="stock-pe-ratio-${unique}">Loading...</p>
                <p id="stock-dividend-yield-${unique}">Loading...</p>
                <p id="stock-52-week-high-${unique}">Loading...</p>
                <p id="stock-52-week-low-${unique}">Loading...</p>
                <p id="stock-description-${unique}">Loading...</p>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById('stock-list');
    stocks.forEach(stock => {
        // Use symbol as unique ID (safe for these symbols)
        const unique = stock.symbol.replace(/[^a-zA-Z0-9]/g, "");
        list.innerHTML += createStockBox(stock, unique);
        fetchStockDetails(stock.symbol, unique);

        // Toggle details on box click
        setTimeout(() => {
            const box = document.getElementById(`stock-box-${unique}`);
            const details = document.getElementById(`stock-details-${unique}`);
            if (box && details) {
                box.addEventListener("click", function(e) {
                    // Prevent toggling when clicking a button inside the box
                    if (e.target.tagName === "BUTTON" || e.target.tagName === "A") return;
                    details.style.display = details.style.display === "none" ? "block" : "none";
                });
            }
        }, 500);
    });

    // Add event delegation for all Add to Watchlist buttons
    document.getElementById('stock-list').addEventListener('click', function(e) {
        if (e.target.classList.contains('add-watchlist-btn')) {
            const symbol = e.target.getAttribute('data-symbol');
            let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
            if (!watchlist.includes(symbol)) {
                watchlist.push(symbol);
                localStorage.setItem("watchlist", JSON.stringify(watchlist));
                window.alert(symbol + " added to watchlist!");
            } else {
                window.alert(symbol + " is already in your watchlist.");
            }
        }
    });
});