# MYStocks 📈

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://insyirahazman.github.io/Stock-Analysis-Web/)

A comprehensive web-based stock analysis platform designed for traders, investors, and financial analysts to make informed investment decisions through data-driven insights and predictive analytics.

## 🌟 Overview

MYStocks is a web-based stock analysis platform based in Malaysia that provides real-time market data, interactive visualizations, and predictive insights for popular US stocks (e.g., AAPL, TSLA, NVDA). Built with modern web technologies, it offers a user-friendly interface suitable for both beginners and professional traders.

**🔗 Live Website:** [https://insyirahazman.github.io/Stock-Analysis-Web/](https://insyirahazman.github.io/Stock-Analysis-Web/)

https://github.com/user-attachments/assets/299f7e45-5b9a-443b-9ef8-42770ac36dd3


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
- Support for popular stocks (AAPL, TSLA, NVDA)

### 📈 **Enhanced Data Visualization**
- **TradingView Integration:** Professional-grade interactive charts
- **Responsive Charts:** Automatically adapts to screen size
- **Multiple Visualization Types:**
  - Real-time stock price charts
  - Moving average overlay
  - Volume indicators
  - Prediction trend lines
- **Mobile-Optimized:** Touch-friendly chart interactions

### 🔧 **Technical Analysis Tools**
- Moving Averages (MA)
- Relative Strength Index (RSI)
- MACD (Moving Average Convergence Divergence)
- Real-time technical indicator calculations

### ⭐ **Personalized Watchlist**
- Add favorite stocks for quick access
- Persistent storage across sessions
- Easy watchlist management

### 🤖 **Advanced Stock Prediction**

**LSTM Neural Network Prediction:**
  - Uses Long Short-Term Memory (LSTM) models for advanced time series forecasting
  - Captures complex patterns and trends in historical price data
  - Provides more accurate and robust predictions compared to traditional methods
  - Visualizes predicted price trends on interactive charts
  - Confidence scoring and market sentiment analysis

### 📱 **Cross-Platform Compatibility**
- **Responsive Design:** Optimized for desktop, tablet, and mobile devices
- **Mobile-First Approach:** Touch-friendly interfaces and navigation
- **Viewport Optimization:** Proper scaling across all screen sizes
- **Progressive Enhancement:** Works on any modern browser

## 🛠️ Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Visualization:** 
  - TradingView Widgets (Professional charts)
  - Chart.js (Prediction analytics)
- **APIs:**
  - Twelve Data (default)
- **Responsive Design:** 
  - CSS Grid and Flexbox
  - Mobile-first methodology
  - Cross-browser compatibility
- **Data Storage:** LocalStorage for user preferences
- **Performance:** Optimized for fast loading and smooth interactions

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
   - Get your free API key from [Twelve Data](https://twelvedata.com/)
  - Open `js/stock_details.js` and replace `'your_api_keys'` with your actual API key

3. **Open the application:**
   - **Simple method:** Double-click `index.html` to open in your browser
   - **Recommended for development:** Use VS Code Live Server extension or any local server:
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

# 🗂️ Project Structure

```
Stock-Analysis-Web/
├── index.html              # Landing page with responsive design
├── login.html              # User authentication system
├── register.html           # New user registration
├── stocks.html             # Stock listing with real-time data
├── chart.html              # TradingView integration + predictions
├── portfolio.html          # Portfolio and watchlist management
├── feedback.html           # User feedback system
├── logout.html             # Session management
├── css/
│   ├── styles.css          # Main responsive stylesheet
│   └── topbar.css          # Navigation with mobile optimization
├── js/
│   ├── main.js             # Core functionality and authentication
│   ├── stock_details.js    # Main stock data API integration (Twelve Data)
│   ├── portfolio.js        # Portfolio management features
│   ├── stock-predictor.js  # Advanced prediction algorithms
│   └── watchlist.js        # Watchlist functionality
├── image/                  # Optimized static assets
│   ├── user_authentication.jpg
│   ├── portfolio_management.png
│   ├── market_analysis.jpg
│   └── remove.jpg          # Bin icon for remove button
└── README.md              # Comprehensive documentation
```

## 📄 License

All rights reserved. This project is for educational/portfolio purposes.

## 📞 Contact

**Developer:** Insyirah Azman  
**GitHub:** [@insyirahazman](https://github.com/insyirahazman)  
**Project Link:** [https://github.com/insyirahazman/Stock-Analysis-Web](https://github.com/insyirahazman/Stock-Analysis-Web)

---
⭐ Star this repository if you found it helpful!
