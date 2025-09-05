# 🚗 Uber Ride Demand Predictor

A basic machine learning web application that predicts weekly ridership demand for Uber based on market conditions and demographic factors.

## 📋 Overview

This Flask-based web application uses a trained machine learning model to predict the number of weekly Uber riders based on:
- Price per week
- Population size
- Monthly income
- Average parking cost per month

## 🚀 Features

- **Interactive Web Interface**: Modern, responsive UI with gradient design
- **Real-time Predictions**: Get instant predictions based on input parameters
- **Dynamic Results Display**: Shows latest prediction with timestamp and input summary
- **Last Prediction Memory**: Remembers and displays your previous prediction
- **Mobile Responsive**: Works seamlessly on all device sizes
- **Beautiful Animations**: Smooth transitions and pulse effects for new predictions

## 🛠️ Technology Stack

- **Backend**: Python, Flask
- **Frontend**: HTML5, CSS3, JavaScript
- **Machine Learning**: scikit-learn, NumPy
- **Data**: Pandas for data handling
- **Styling**: Modern CSS with gradients and animations

## 📁 Project Structure

```
UBER-RIDE-PREDICT/
├── app.py                 # Main Flask application
├── model.pkl             # Trained ML model (pickle file)
├── taxi.csv              # Training dataset
├── ml_model.ipynb        # Jupyter notebook for model training
├── templates/
│   └── index.html        # Main web interface
├── static/
│   └── styles.css        # Modern CSS styling
├── venv/                 # Virtual environment
├── requirements.txt      # Python dependencies
└── README.md            # Project documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip package manager

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd UBER-RIDE-PREDICT
```

### Step 2: Create Virtual Environment
```bash
python -m venv venv
```

### Step 3: Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 5: Run the Application
```bash
python app.py
```

The application will be available at `http://127.0.0.1:5000`

## 📊 Usage

1. **Open the Web Interface**: Navigate to `http://127.0.0.1:5000` in your browser
2. **Enter Market Data**:
   - Price per Week ($)
   - Population (number of people)
   - Monthly Income ($)
   - Average Parking Cost per Month ($)
3. **Get Prediction**: Click "Predict Weekly Riders" to get results
4. **View Results**: See the predicted number of weekly riders with timestamp
5. **Check Last Prediction**: Return to homepage to see your previous prediction

## 🎯 Model Information

The machine learning model is trained on historical Uber ride data with the following features:
- **Input Features**: 4 numerical features (price, population, income, parking cost)
- **Output**: Predicted number of weekly riders
- **Algorithm**: [Specify the algorithm used - e.g., Linear Regression, Random Forest, etc.]
- **Performance**: [Add model performance metrics if available]

## 📈 Sample Data

Example input values:
- Price per Week: $15-100
- Population: 1,500,000 - 1,800,000
- Monthly Income: $5,000 - $16,000
- Parking Cost: $50 - $200

## 🎨 UI Features

- **Modern Design**: Glass morphism effects with gradient backgrounds
- **Responsive Layout**: Adapts to all screen sizes
- **Interactive Elements**: Hover effects and smooth animations
- **Dynamic Results**: Pulse animation for new predictions
- **Timestamp Display**: 12-hour format with DD-MM-YYYY date format

## 🔮 Future Enhancements

- [ ] Add more input features (weather, events, etc.)
- [ ] Implement model retraining functionality
- [ ] Add data visualization charts
- [ ] Export prediction results
- [ ] User authentication and prediction history
- [ ] API endpoints for external integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Dataset source: [Specify data source]
- Inspiration: Uber's demand prediction challenges
- UI Design: Modern web design principles

---

**Note**: This is a demonstration project for educational purposes. For production use, consider additional features like data validation, error handling, and security measures.
