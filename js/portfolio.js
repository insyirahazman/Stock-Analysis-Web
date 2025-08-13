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
    ul.innerHTML = list.length
        ? list.map(item =>
            `<li style="display: flex; align-items: center; gap: 8px; min-height: 32px;">
                <a href="chart.html?symbol=${encodeURIComponent(item.symbol)}&name=${encodeURIComponent(item.name)}" 
                   style="text-decoration:none;color:inherit;">
                   ${item.symbol} - ${item.name}
                </a>
                <button type="button" class="remove-btn" onclick="removeFromWatchlist('${item.symbol}')" style="width:auto; height:auto; padding:0; margin:0; display:flex; align-items:center; justify-content:center; background:none; border:none; min-height:0; min-width:0;">
                    <img src="image/remove.jpg" alt="Remove" style="width:20px;height:20px;display:block; margin:0; padding:0;">
                </button>
            </li>`
        ).join("")
        : "<li>No stocks in watchlist.</li>";
}
window.removeFromWatchlist = function(symbol) {
    const list = getWatchlist().filter(item => item.symbol !== symbol);
    saveWatchlist(list);
    renderWatchlist();
}
document.getElementById("watchlistSelect").onchange = function() {
    const option = this.options[this.selectedIndex];
    const symbol = option.value;
    if (!symbol) return;
    let watchlist = getWatchlist();
    if (!watchlist.some(item => item.symbol === symbol)) {
        watchlist.push({ symbol, name });
        saveWatchlist(watchlist);
        window.alert(symbol + " added to watchlist!");
        renderWatchlist();
    } else {
        window.alert(symbol + " is already in your watchlist.");
    }
    this.value = ""; // Reset select
};
renderWatchlist();