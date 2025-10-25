# Cell 1 - Import libraries
import pandas as pd
import numpy as np
import pickle
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# Cell 2 - Generate synthetic data
np.random.seed(42)

# Generate 8000 house records
n_samples = 8000

# Generate features
bedrooms = np.random.randint(1, 9, n_samples)
bathrooms = np.random.choice([1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0], n_samples)
square_footage = np.random.randint(600, 6001, n_samples)
zipcode = np.random.randint(10000, 100000, n_samples)

# Define high-value zipcodes (20-40% premium)
high_value_zipcodes = [94102, 90210, 10001, 33139, 94301, 98101, 60614, 78701, 80202, 19103, 33109, 77002, 30308, 20001]

# Generate realistic prices
prices = []
for i in range(n_samples):
    # Base price from square footage ($150-200 per sqft)
    base_price = square_footage[i] * np.random.uniform(150, 200)

    # Add bedroom premium ($5k-15k per bedroom)
    bedroom_premium = bedrooms[i] * np.random.uniform(5000, 15000)

    # Add bathroom premium ($10k-20k per bathroom)
    bathroom_premium = bathrooms[i] * np.random.uniform(10000, 20000)

    # Location premium for high-value zipcodes
    location_multiplier = 1.0
    if zipcode[i] in high_value_zipcodes:
        location_multiplier = np.random.uniform(1.2, 1.4)

    # Calculate total with random noise (±10-15%)
    total = (base_price + bedroom_premium + bathroom_premium) * location_multiplier
    noise_factor = np.random.uniform(0.85, 1.15)
    final_price = total * noise_factor

    # Ensure price is within reasonable range
    final_price = max(80000, min(1200000, final_price))
    prices.append(final_price)

prices = np.array(prices)

# Cell 3 - Create DataFrame
data = pd.DataFrame({
    'Bedrooms': bedrooms,
    'Bathrooms': bathrooms,
    'SquareFootage': square_footage,
    'Zipcode': zipcode,
    'Price': prices
})

print(f"Dataset created with {len(data)} records")
print(f"\nFirst 5 rows:")
print(data.head())

# Cell 4 - Save CSV
data.to_csv('housing_data.csv', index=False)
print("\nDataset saved to housing_data.csv")

# Cell 5 - Prepare features and target
X = data[['Bedrooms', 'Bathrooms', 'SquareFootage', 'Zipcode']]
y = data['Price']

print(f"\nFeatures shape: {X.shape}")
print(f"Target shape: {y.shape}")

# Cell 6 - Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"\nTraining set: {X_train.shape[0]} samples")
print(f"Test set: {X_test.shape[0]} samples")

# Cell 7 - Create and train model
model = RandomForestRegressor(n_estimators=100, random_state=42, max_depth=20)
print("\nTraining RandomForest model...")
model.fit(X_train, y_train)
print("Model training complete!")

# Cell 8 - Evaluate model
train_score = model.score(X_train, y_train)
test_score = model.score(X_test, y_test)

print(f"\nTraining Score (R²): {train_score:.4f}")
print(f"Test Score (R²): {test_score:.4f}")

# Cell 9 - Save model
with open('model.pkl', 'wb') as file:
    pickle.dump(model, file)
print("\nModel saved to model.pkl")

# Cell 10 - Test loaded model
with open('model.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

# Test with sample input: 3 bedrooms, 2.5 bathrooms, 2000 sqft, zipcode 94102
test_input = [[3, 2.5, 2000, 94102]]
prediction = loaded_model.predict(test_input)

print(f"\nTest prediction for {test_input[0]}:")
print(f"Predicted Price: ${prediction[0]:,.2f}")
