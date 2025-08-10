# MYStocks 📈

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://insyirahazman.github.io/Stock-Analysis-Web/)

A comprehensive web-based stock analysis platform designed for traders, investors, and financial analysts to make informed investment decisions through data-driven insights and predictive analytics.

## 🌟 Overview

MYStocks is a Malaysia-focused stock analysis platform that provides real-time market data, interactive visualizations, and predictive insights for NASDAQ stocks. Built with modern web technologies, it offers a user-friendly interface suitable for both beginners and professional traders.

**🔗 Live Website:** [https://insyirahazman.github.io/Stock-Analysis-Web/](https://insyirahazman.github.io/Stock-Analysis-Web/)

## ✨ Key Features

### 🔐 **User Authentication**
- Secure user registration and login system
- Personalized stock analysis dashboard
- User session management

### 📊 **Stock Management**
- Browse and search global stock markets
- Real-time stock data including:
  - Current price and daily changes
  - Trading volume
  - Company descriptions
- Support for popular stocks (AAPL, TSLA, NVDA, etc.)

### 📈 **Interactive Data Visualization**
- Dynamic charts powered by Chart.js
- Multiple chart types:
  - Line charts for price trends
  - Candlestick charts for detailed analysis
  - Bar graphs for volume data
- Customizable time periods and indicators

### 🔧 **Technical Analysis Tools**
- Moving Averages (MA)
- Relative Strength Index (RSI)
- MACD (Moving Average Convergence Divergence)
- Real-time technical indicator calculations

### ⭐ **Personalized Watchlist**
- Add favorite stocks for quick access
- Persistent storage across sessions
- Easy watchlist management

### 🤖 **Price Prediction**
- Linear regression-based price forecasting
- Historical data analysis
- Next-day price predictions

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Visualization:** Chart.js
- **Data Storage:** LocalStorage
- **API Integration:** Stock market data APIs
- **Responsive Design:** Mobile-first approach

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for real-time data

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/insyirahazman/Stock-Analysis-Web.git
cd Stock-Analysis-Web
```

2. **Configure API Key:**
   - Get your free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key) or [Twelve Data](https://twelvedata.com/)
   - Open `js/stock.js` and replace `'your_api_keys'` with your actual API key

3. **Open the application:**
   - **Simple method:** Double-click `index.html` to open in your browser
   - **Recommended for development:** Use VS Code Live Server extension or any local server:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

## 📱 Usage

1. **Register/Login:** Create an account or log in to access personalized features
2. **Browse Stocks:** Navigate to the Stocks page to view available securities
3. **View Charts:** Click on any stock to view detailed charts and analysis
4. **Add to Watchlist:** Save your favorite stocks for quick access
5. **Analyze Trends:** Use technical indicators to analyze market trends
6. **Price Prediction:** Input historical data to get price forecasts

## 🎯 Benefits

### 👥 **User Empowerment**
- Customizable dashboards and watchlists
- Real-time data for informed decision-making
- Predictive analytics for strategic planning

### 📱 **Accessibility**
- Cross-platform compatibility (desktop, tablet, mobile)
- No installation required - runs in any modern browser
- Responsive design for optimal viewing on any device

### 🎓 **Beginner-Friendly**
- Intuitive user interface
- Simplified trading concepts
- Educational tooltips and guides

## 🗂️ Project Structure

```
Stock-Analysis-Web/
├── index.html          # Landing page
├── login.html          # User authentication
├── stocks.html         # Stock listing page
├── chart.html          # Stock chart visualization
├── portfolio.html      # User portfolio management
├── css/
│   ├── styles.css      # Main stylesheet
│   └── topbar.css      # Navigation styles
├── js/
│   ├── main.js         # Core functionality
│   ├── stock.js        # Stock data management
│   ├── portfolio.js    # Portfolio features
│   ├── stock-predictor.js # Prediction algorithms
│   └── watchlist.js    # Watchlist management
└── image/              # Static assets
```

## 📄 License

All rights reserved. This project is for educational/portfolio purposes.

## 📞 Contact

**Developer:** Insyirah Azman  
**GitHub:** [@insyirahazman](https://github.com/insyirahazman)  
**Project Link:** [https://github.com/insyirahazman/Stock-Analysis-Web](https://github.com/insyirahazman/Stock-Analysis-Web)

---
⭐ Star this repository if you found it helpful!