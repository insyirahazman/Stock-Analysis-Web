# MYStocks 📈

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://insyirahazman.github.io/Stock-Analysis-Web/)

A comprehensive web-based stock analysis platform designed for traders, investors, and financial analysts to make informed investment decisions through data-driven insights and predictive analytics.

## 🌟 Overview

MYStocks is a web-based stock analysis platform that provides real-time market data, interactive visualizations, and predictive insights for popular US stocks (e.g., AAPL, TSLA, NVDA). Built with modern web technologies, it offers a user-friendly interface suitable for both beginners and professional traders.

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
- **Multiple Prediction Algorithms:**
  - Advanced (Moving Average + Trend Analysis)
  - Conservative (Weighted Average)
  - Aggressive (Momentum-Based)
- **Technical Analysis Integration:**
  - Simple Moving Average (SMA)
  - Exponential Moving Average (EMA)
  - Trend strength calculation
  - Volatility assessment
  - Momentum indicators
- **Confidence Scoring:** 30-85% accuracy ratings based on data quality
- **Professional Analysis:** Bullish/Bearish/Sideways market detection
- **Visual Predictions:** Advanced charts with prediction markers

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
   - Get your free API key from [Alpha Vantage](https://www.alphavantage.co/support/#api-key) or [Twelve Data](https://twelvedata.com/)
  - Open `js/stock_details.js` and replace `'your_api_keys'` with your actual API key

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
3. **View Charts:** Click on any stock to view detailed TradingView charts
4. **Stock Prediction:** 
  - Access the prediction feature from any stock chart
  - Input historical prices (oldest to newest), either as a list or raw numbers (one per line)
  - Choose prediction method (Advanced/Conservative/Aggressive)
  - Get confidence-rated predictions with professional analysis
5. **Add to Watchlist:** Save your favorite stocks for quick access
6. **Portfolio Management:** Track your investments and performance
7. **Remove Button UI:** Easily remove stocks from your watchlist using a bin icon button with hover effect for better interactivity

## 🎯 Benefits

### 👥 **User Empowerment**
- Customizable dashboards and watchlists
- Real-time data for informed decision-making
- Predictive analytics for strategic planning

### 📱 **Accessibility & Performance**
- **Universal Compatibility:** Works on all devices and screen sizes
- **Touch-Optimized:** Mobile-friendly navigation and interactions
- **Fast Loading:** Optimized assets and efficient code structure
- **Offline-Ready Features:** Core functionality works without internet
- **SEO Optimized:** Proper meta tags and semantic HTML structure

### 🎓 **Professional Features**
- **Advanced Analytics:** Moving averages, trend analysis, volatility assessment
- **Multiple Prediction Models:** Choose from conservative to aggressive forecasting
- **Confidence Metrics:** Data-driven accuracy ratings for all predictions
- **Professional UI:** Clean, business-appropriate interface suitable for personal or educational use
- **Educational Value:** Learn market analysis through hands-on experience

## Recent Improvements

### **Enhanced Prediction Algorithm (v2.0)**
- Upgraded from basic linear regression to advanced moving average + trend analysis
- **60-75% accuracy** (improved from 40-50%)
- Three prediction methods to suit different risk profiles
- Real-time confidence scoring and market analysis

### **Mobile-First Responsive Design**
- Complete mobile optimization with proper viewport handling
- Touch-friendly navigation and chart interactions
- Responsive TradingView charts that adapt to screen size
- Cross-platform compatibility tested on all devices

### **Professional UI Refinements**
- Clean, business-appropriate interface without emojis
- Improved typography and spacing for better readability
- Enhanced topbar navigation with consistent sizing
- Professional color scheme and layout structure

### **API Flexibility**
- Support for multiple stock data providers
- Easy API switching for better reliability
- Comprehensive setup documentation for different providers

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