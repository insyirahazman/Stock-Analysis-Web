// Twelve Data apiKey
const apiKey = '2a5eb39fe7424bdcad1a78a91ffe8300';
const stocks = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "TSLA", name: "Tesla Inc." },
    { symbol: "MSFT", name: "Microsoft Corp." },
    { symbol: "NVDA", name: "NVIDIA Corp." }
];

function fetchStockDetails(symbol, unique) {
    [
        "stock-price", "stock-change", "stock-volume",
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
                document.getElementById(`stock-title-${unique}`).innerText = `${data.name || symbol} (${data.symbol || symbol})`;
                document.getElementById(`stock-market-cap-${unique}`).innerText = data.market_cap || "N/A";
                document.getElementById(`stock-pe-ratio-${unique}`).innerText = data.pe || "N/A";
                document.getElementById(`stock-dividend-yield-${unique}`).innerText = data.dividend_yield || "N/A";
                document.getElementById(`stock-52-week-high-${unique}`).innerText = data.fifty_two_week?.high || "N/A";
                document.getElementById(`stock-52-week-low-${unique}`).innerText = data.fifty_two_week?.low || "N/A";
            } else {
                document.getElementById(`stock-title-${unique}`).innerText = "Stock not found.";
            }
        });

    // TIME SERIES
    fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data && !data.status) {
                const value = data.values && data.values[0] ? data.values[0] : {};
                document.getElementById(`stock-price-${unique}`).innerText = value.close || "N/A";
                const changeElem = document.getElementById(`stock-change-${unique}`);
                let change = value.close && value.open ? (parseFloat(value.close) - parseFloat(value.open)).toFixed(2) : "N/A";
                changeElem.innerText = change;

                // Remove previous classes
                changeElem.classList.remove('positive', 'negative');

                // Add color class if value is a number
                if (!isNaN(change) && change !== "N/A") {
                    if (parseFloat(change) > 0) {
                        changeElem.classList.add('positive');
                    } else if (parseFloat(change) < 0) {
                        changeElem.classList.add('negative');
                    }
                }

                document.getElementById(`stock-volume-${unique}`).innerText = value.volume || "N/A";
            }
        });

    // 3. PROFILE: Description
    fetch(`https://api.twelvedata.com/profile?symbol=${symbol}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data && !data.status) {
                document.getElementById(`stock-description-${unique}`).innerText = data.description || "N/A";
            }
        });
}

function createStockBox(stock, unique) {
    return `
        <div class="stock-box" id="stock-box-${unique}" style="cursor:pointer">
            <h4 id="stock-title-${unique}">${stock.name} (${stock.symbol})</h4>

            <div class="stock-field"><span class="label">Price:</span> <span id="stock-price-${unique}" class="value">Loading...</span></div>
            <div class="stock-field"><span class="label">Change:</span> <span id="stock-change-${unique}" class="value">Loading...</span></div>
            <div class="stock-field"><span class="label">Volume:</span> <span id="stock-volume-${unique}" class="value">Loading...</span></div>

            <div id="stock-details-${unique}" class="stock-details" style="display:none; margin-top:10px;">
                <div class="stock-field"><span class="label">Market Cap:</span> <span id="stock-market-cap-${unique}" class="value">Loading...</span></div>
                <div class="stock-field"><span class="label">PE Ratio:</span> <span id="stock-pe-ratio-${unique}" class="value">Loading...</span></div>
                <div class="stock-field"><span class="label">Dividend Yield:</span> <span id="stock-dividend-yield-${unique}" class="value">Loading...</span></div>
                <div class="stock-field"><span class="label">52 Week High:</span> <span id="stock-52-week-high-${unique}" class="value">Loading...</span></div>
                <div class="stock-field"><span class="label">52 Week Low:</span> <span id="stock-52-week-low-${unique}" class="value">Loading...</span></div>
                <div class="stock-field"><span class="label">Description:</span> <span id="stock-description-${unique}" class="value">Loading...</span></div>
            </div>

            <div class="stock-box-btn1">
                <button type="button" class="add-watchlist-btn" data-symbol="${stock.symbol}" data-name="${stock.name}">Add to Watchlist</button>
            </div>
            <div class="stock-chart-btn2">
                <button type="button" onclick="window.location.href='chart.html?symbol=${stock.symbol}&name=${encodeURIComponent(stock.name)}'">View Chart</button>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById('stock-list');
    stocks.forEach(stock => {
        const unique = stock.symbol.replace(/[^a-zA-Z0-9]/g, "");
        list.innerHTML += createStockBox(stock, unique);
        fetchStockDetails(stock.symbol, unique);
    });

    // Accordion: only one box shows details at a time, and clicking again closes it
    list.addEventListener("click", function(e) {
        const box = e.target.closest(".stock-box");
        if (!box) return;

        // Prevent toggling when clicking a button or link inside the box
        if (e.target.classList.contains('add-watchlist-btn') ||
            e.target.closest('.stock-chart-btn2') ||
            e.target.tagName === "BUTTON" ||
            e.target.tagName === "A") return;

        // Find the details div for this box
        const details = box.querySelector(".stock-details");
        const isOpen = details && details.style.display === "block";

        // Hide all details first
        document.querySelectorAll(".stock-box .stock-details").forEach(div => {
            div.style.display = "none";
        });

        // Toggle: if it was not open, open it; if it was open, close it (leave all closed)
        if (details && !isOpen) {
            details.style.display = "block";
        }
        // If isOpen, do nothing (all are now closed)
    });

    // Add to Watchlist button logic
    list.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-watchlist-btn')) {
            const symbol = e.target.getAttribute('data-symbol');
            const name = e.target.getAttribute('data-name');
            let watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
            if (!watchlist.some(item => item.symbol === symbol)) {
                watchlist.push({ symbol, name });
                localStorage.setItem("watchlist", JSON.stringify(watchlist));
                window.alert(name + " added to watchlist!");
            } else {
                window.alert(name + " is already in your watchlist.");
            }
        }
    });
});