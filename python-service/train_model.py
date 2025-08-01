import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib
import numpy as np

def create_and_train_model():
    """
    This function generates sample data, trains a machine learning model,
    and saves it to a file.
    """
    print("Starting model training process...")

    # 1. Generate realistic sample data
    np.random.seed(42)
    num_samples = 1000
    data = {
        'mileage': np.random.randint(5000, 200000, num_samples),
        'age': np.random.randint(1, 15, num_samples),
        'days_since_service': np.random.randint(1, 730, num_samples)
    }
    df = pd.DataFrame(data)

    # 2. Create the target variable (what we want to predict)
    # This is our "ground truth". Maintenance is likely needed if:
    # - days since service is over a year (365 days)
    # - mileage is high and it's been a while since service
    # We add some randomness to make it more realistic.
    conditions = [
        (df['days_since_service'] > 365),
        (df['mileage'] > 100000) & (df['days_since_service'] > 180),
        (df['age'] > 10) & (df['days_since_service'] > 180)
    ]
    probabilities = np.select(conditions, [0.8, 0.7, 0.75], default=0.1)
    df['needs_maintenance'] = (np.random.rand(num_samples) < probabilities).astype(int)
    
    print(f"\nGenerated {num_samples} data samples.")
    print(f"Maintenance required in {df['needs_maintenance'].sum()} samples.")

    # 3. Define features (X) and target (y)
    X = df[['mileage', 'age', 'days_since_service']]
    y = df['needs_maintenance']

    # 4. Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    print(f"\nData split into {len(X_train)} training and {len(X_test)} testing samples.")

    # 5. Initialize and train the Logistic Regression model
    model = LogisticRegression()
    model.fit(X_train, y_train)
    print("\nModel training complete.")

    # 6. Evaluate the model (optional but good practice)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model accuracy on test data: {accuracy:.2f}")

    # 7. Save the trained model to a file
    model_filename = 'models/vehicle_maintenance_model.pkl'
    joblib.dump(model, model_filename)
    print(f"\nModel saved successfully to '{model_filename}'")


if __name__ == '__main__':
    create_and_train_model()