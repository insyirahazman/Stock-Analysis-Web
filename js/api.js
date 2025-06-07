const apiKey = '7f91e7f920cc435b80b5605738ccc713'; // Replace with your real API key
const symbol = 'AAPL'; // Example stock symbol

fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&apikey=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    // Do something with the data, e.g., display on your page
    console.log(data);
    // Example: document.getElementById('stock-data').innerText = JSON.stringify(data, null, 2);
  })

  .catch(error => {
    console.error('Error fetching stock data:', error);
  });