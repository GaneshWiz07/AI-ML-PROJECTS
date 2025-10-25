from flask import Flask, render_template, request
import numpy as np
import pickle
from datetime import datetime

# Initialize Flask app
app = Flask(__name__)

# Load the trained model
model = pickle.load(open('model.pkl', 'rb'))

# Global variable for last prediction
last_prediction = {
    'result': None,
    'timestamp': None,
    'inputs': None
}

@app.route('/')
def home():
    return render_template('index.html', last_prediction=last_prediction)

@app.route('/predict', methods=['POST'])
def predict():
    global last_prediction

    # Extract form values
    bedrooms = int(request.form['bedrooms'])
    bathrooms = float(request.form['bathrooms'])
    sqft = int(request.form['sqft'])
    zipcode = int(request.form['zipcode'])

    # Create numpy array for prediction
    features_array = np.array([bedrooms, bathrooms, sqft, zipcode]).reshape(1, -1)

    # Get prediction
    prediction = model.predict(features_array)

    # Round to nearest hundred
    rounded_price = int(round(prediction[0] / 100) * 100)

    # Update last_prediction dictionary
    last_prediction = {
        'result': rounded_price,
        'timestamp': datetime.now().strftime('%d-%m-%Y %I:%M:%S %p'),
        'inputs': {
            'bedrooms': bedrooms,
            'bathrooms': bathrooms,
            'sqft': sqft,
            'zipcode': zipcode
        }
    }

    # Format price with commas
    formatted_price = "{:,}".format(rounded_price)

    return render_template('index.html',
                         prediction_text=f'Estimated House Price: ${formatted_price}',
                         last_prediction=last_prediction,
                         new_prediction=True)

if __name__ == '__main__':
    app.run(debug=True)
