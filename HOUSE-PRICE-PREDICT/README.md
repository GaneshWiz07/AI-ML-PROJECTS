# 🏠 House Price Predictor

A sophisticated machine learning web application that predicts residential property values based on key property features and location data.

## 📋 Overview

This Flask-based web application uses a trained Random Forest machine learning model to predict house prices based on:
- Number of bedrooms
- Number of bathrooms
- Square footage
- Zipcode (location)

## 🚀 Features

- **Interactive Web Interface**: Modern, responsive UI with glassmorphism design and gradient animations
- **Real-time Predictions**: Get instant property valuations based on input parameters
- **Dynamic Results Display**: Beautiful price presentation with confidence indicators and timestamp
- **Last Prediction Memory**: Remembers and displays your previous prediction
- **Mobile Responsive**: Seamless experience across all device sizes
- **Beautiful Animations**: Smooth transitions, pulse effects, and floating background elements
- **Confidence Score**: Visual indicator showing prediction reliability

## 🛠️ Technology Stack

- **Backend**: Python 3.7+, Flask
- **Frontend**: HTML5, CSS3 (Glassmorphism design)
- **Machine Learning**: scikit-learn (RandomForestRegressor), NumPy
- **Data Processing**: Pandas
- **Model Persistence**: Pickle
- **Training Data**: Synthetic dataset with 8,000 property records

## 📁 Project Structure

```
HOUSE-PRICE-PREDICT/
├── app.py                 # Main Flask application
├── train_model.py         # Model training script
├── model.pkl             # Trained ML model (pickle file)
├── housing_data.csv      # Generated training dataset
├── ml_model.ipynb        # Jupyter notebook for model experimentation
├── templates/
│   └── index.html        # Modern web interface
├── static/
│   └── styles.css        # Glassmorphism CSS styling
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
cd HOUSE-PRICE-PREDICT
```

### Step 2: Create Virtual Environment (Recommended)
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

**Note:** If you encounter binary incompatibility errors (numpy/pandas), use these specific versions:
```bash
pip install numpy==1.26.4 pandas==2.1.4 scikit-learn==1.3.2 scipy==1.11.4
```

### Step 5: Train the Model (First Time Only)
```bash
python train_model.py
```
This will:
- Generate synthetic housing data (8,000 records)
- Train a RandomForest model
- Save the model as `model.pkl`
- Display model performance metrics

### Step 6: Run the Application
```bash
python app.py
```

The application will be available at `http://127.0.0.1:5000`

## 📊 Usage

1. **Open the Web Interface**: Navigate to `http://127.0.0.1:5000` in your browser
2. **Enter Property Details**:
   - **Bedrooms**: Number of bedrooms (1-8)
   - **Bathrooms**: Number of bathrooms (1.0, 1.5, 2.0, etc.)
   - **Square Footage**: Total living area in square feet
   - **Zipcode**: 5-digit US zipcode
3. **Get Prediction**: Click "Predict House Price" to get instant valuation
4. **View Results**: See the estimated price with input summary and timestamp
5. **Check Last Prediction**: Previous prediction is saved and displayed on page reload

## 🎯 Model Information

### Algorithm
- **Model Type**: Random Forest Regressor
- **Estimators**: 100 trees
- **Max Depth**: 20 levels
- **Random State**: 42 (for reproducibility)

### Training Data
- **Total Records**: 8,000 synthetic house listings
- **Features**: Bedrooms, Bathrooms, Square Footage, Zipcode
- **Price Range**: $80,000 - $1,200,000
- **Square Footage Range**: 600 - 6,000 sq ft
- **Training Split**: 80% train, 20% test

### Performance Metrics
- **Training R² Score**: ~0.98+ (High accuracy)
- **Test R² Score**: ~0.95+ (Excellent generalization)

### Pricing Logic
The model learns from realistic pricing patterns:
- Base price: $150-200 per square foot
- Bedroom premium: $5,000-15,000 per bedroom
- Bathroom premium: $10,000-20,000 per bathroom
- Location multiplier: 20-40% premium for high-value zipcodes

### High-Value Zipcodes (Premium Locations)
- 94102, 94301 (San Francisco Bay Area)
- 90210 (Beverly Hills)
- 10001 (New York City)
- 33139, 33109 (Miami Beach)
- 98101 (Seattle)
- 60614 (Chicago)
- 78701 (Austin)
- 80202 (Denver)
- 19103 (Philadelphia)
- 77002 (Houston)
- 30308 (Atlanta)
- 20001 (Washington DC)

## 📈 Sample Data

Example input values for testing:

**Luxury Property:**
- Bedrooms: 5
- Bathrooms: 4.5
- Square Footage: 4,500
- Zipcode: 94102 (San Francisco)
- Expected Price: ~$900,000 - $1,100,000

**Mid-Range Property:**
- Bedrooms: 3
- Bathrooms: 2.5
- Square Footage: 2,000
- Zipcode: 60614 (Chicago)
- Expected Price: ~$450,000 - $600,000

**Entry-Level Property:**
- Bedrooms: 2
- Bathrooms: 1.5
- Square Footage: 1,200
- Zipcode: 30308 (Atlanta)
- Expected Price: ~$180,000 - $280,000

## 🎨 UI Features

- **Modern Glassmorphism Design**: Frosted glass effect with transparency
- **Animated Gradient Background**: Smooth color transitions
- **Floating Background Shapes**: Dynamic elements that move across the screen
- **Responsive Layout**: Perfect display on desktop, tablet, and mobile
- **Interactive Elements**: Hover effects, focus states, and button animations
- **Dynamic Price Display**: Large, prominent price with pulse animation
- **Confidence Indicator**: Visual bar showing prediction confidence (92%)
- **Input Validation**: Client-side form validation for data integrity
- **Timestamp Display**: DD-MM-YYYY format with 12-hour time

## 🔮 Future Enhancements

- [ ] Add more features (year built, lot size, garage spaces, property type)
- [ ] Implement neighborhood crime rate and school rating factors
- [ ] Add data visualization (price trends, feature importance charts)
- [ ] Export prediction reports as PDF
- [ ] User authentication and prediction history tracking
- [ ] Comparison tool for multiple properties
- [ ] RESTful API endpoints for external integration
- [ ] Real-time market data integration
- [ ] Map integration showing property location
- [ ] Price range estimates (min-max with confidence intervals)

## 📝 Model Retraining

If you want to retrain the model with different parameters:

1. Edit `train_model.py` to modify:
   - Number of samples
   - Feature ranges
   - Model hyperparameters
   - High-value zipcodes

2. Run the training script:
```bash
python train_model.py
```

3. The new `model.pkl` will be saved automatically

## 🐛 Troubleshooting

### Binary Incompatibility Error
If you see `ValueError: numpy.dtype size changed`:
```bash
pip uninstall numpy pandas scikit-learn scipy -y
pip install numpy==1.26.4 pandas==2.1.4 scikit-learn==1.3.2 scipy==1.11.4
```

### Model Not Found Error
If `model.pkl` is missing:
```bash
python train_model.py
```

### Port Already in Use
Change the port in `app.py`:
```python
app.run(debug=True, port=5001)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -am 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- Portfolio: [yourwebsite.com](https://yourwebsite.com)

## 🙏 Acknowledgments

- Dataset: Synthetically generated using realistic pricing patterns
- Inspiration: Modern real estate valuation tools (Zillow, Redfin)
- UI Design: Glassmorphism and modern web design principles
- ML Framework: scikit-learn community and documentation

## 📞 Support

For support, email your.email@example.com or open an issue in the GitHub repository.

---

**Note**: This is a demonstration project using synthetic data for educational purposes. For production real estate applications, use real market data, additional features, and consider regulatory compliance requirements.

**⭐ If you found this project helpful, please give it a star!**
