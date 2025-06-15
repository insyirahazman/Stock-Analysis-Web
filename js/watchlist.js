function getWatchlist() {
    return JSON.parse(localStorage.getItem("watchlist") || "[]");
}
function saveWatchlist(list) {
    localStorage.setItem("watchlist", JSON.stringify(list));
}
function addToWatchlist(symbol) {
    let watchlist = getWatchlist();
    symbol = symbol.trim().toUpperCase();
    if (!symbol) return false;
    if (!watchlist.includes(symbol)) {
        watchlist.push(symbol);
        saveWatchlist(watchlist);
        return true;
    }
    return false;
}
function removeFromWatchlist(symbol) {
    let watchlist = getWatchlist().filter(s => s !== symbol);
    saveWatchlist(watchlist);
}
function renderWatchlist(ulId) {
    const ul = document.getElementById(ulId);
    if (!ul) return;
    const list = getWatchlist();
    ul.innerHTML = list.length
        ? list.map(symbol =>
            `<li>${symbol} <button onclick="removeFromWatchlistAndRender('${symbol}','${ulId}')">Remove</button></li>`
        ).join("")
        : "<li>No stocks in watchlist.</li>";
}
function removeFromWatchlistAndRender(symbol, ulId) {
    removeFromWatchlist(symbol);
    renderWatchlist(ulId);
}