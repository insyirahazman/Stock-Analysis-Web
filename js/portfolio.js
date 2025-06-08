// --- Watchlist ---
function getWatchlist() {
    return JSON.parse(localStorage.getItem("watchlist") || "[]");
}
function saveWatchlist(list) {
    localStorage.setItem("watchlist", JSON.stringify(list));
}
function renderWatchlist() {
    const ul = document.getElementById("watchlist");
    const list = getWatchlist();
    ul.innerHTML = list.map(symbol =>
        `<li>${symbol} <button onclick="removeFromWatchlist('${symbol}')">Remove</button></li>`
    ).join("") || "<li>No stocks in watchlist.</li>";
}
function removeFromWatchlist(symbol) {
    const list = getWatchlist().filter(s => s !== symbol);
    saveWatchlist(list);
    renderWatchlist();
}
document.getElementById("watchlistForm").onsubmit = function(e) {
    e.preventDefault();
    const symbol = document.getElementById("watchSymbol").value.trim().toUpperCase();
    if (!symbol) return;
    const list = getWatchlist();
    if (!list.includes(symbol)) {
        list.push(symbol);
        saveWatchlist(list);
    }
    renderWatchlist();
    this.reset();
};
renderWatchlist();

// --- Alerts ---
function getAlerts() {
    return JSON.parse(localStorage.getItem("priceAlerts") || "[]");
}
function saveAlerts(alerts) {
    localStorage.setItem("priceAlerts", JSON.stringify(alerts));
}
function renderAlerts() {
    const ul = document.getElementById("alertsList");
    const alerts = getAlerts();
    ul.innerHTML = alerts.map(a =>
        `<li>${a.symbol} at $${a.price} <button onclick="removeAlert('${a.symbol}',${a.price})">Remove</button></li>`
    ).join("") || "<li>No active alerts.</li>";
}
function removeAlert(symbol, price) {
    const alerts = getAlerts().filter(a => !(a.symbol === symbol && a.price === price));
    saveAlerts(alerts);
    renderAlerts();
}
document.getElementById("alertForm").onsubmit = function(e) {
    e.preventDefault();
    const symbol = document.getElementById("alertSymbol").value.trim().toUpperCase();
    const price = parseFloat(document.getElementById("alertPrice").value);
    if (!symbol || isNaN(price)) return;
    const alerts = getAlerts();
    alerts.push({ symbol, price });
    saveAlerts(alerts);
    renderAlerts();
    this.reset();
};
renderAlerts();

// --- Optional: Poll for alerts (demo, every 10s) ---
setInterval(function() {
    const alerts = getAlerts();
    if (alerts.length === 0) return;
    alerts.forEach(alert => {
        fetch(`https://api.twelvedata.com/quote?symbol=${alert.symbol}&apikey=7f91e7f920cc435b80b5605738ccc713`)
            .then(res => res.json())
            .then(data => {
                if (data && !data.status && data.close) {
                    const current = parseFloat(data.close);
                    if (current >= alert.price) {
                        window.alert(`ALERT: ${alert.symbol} has reached $${current} (target: $${alert.price})`);
                        saveAlerts(alerts.filter(a => !(a.symbol === alert.symbol && a.price === alert.price)));
                        renderAlerts();
                    }
                }
            });
    });
}, 10000);