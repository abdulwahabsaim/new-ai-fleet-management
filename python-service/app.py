from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# --- Load the Trained Model ---
try:
    model = joblib.load('models/vehicle_maintenance_model.pkl')
    print("Machine learning model loaded successfully.")
except FileNotFoundError:
    model = None
    print("ERROR: Model file not found. Please run train_model.py first.")

# --- API Endpoints ---
@app.route('/predict', methods=['POST'])
def predict():
    """
    API endpoint to predict vehicle maintenance probability.
    Expects JSON like:
    {
        "mileage": 75000,
        "age": 4,
        "days_since_service": 120
    }
    """
    if model is None:
        return jsonify({"error": "Model not available. Check service logs."}), 500

    if not request.json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.json
    
    # Basic validation
    required_fields = ['mileage', 'age', 'days_since_service']
    if not all(field in data for field in required_fields):
        return jsonify({"error": f"Missing one or more required fields: {required_fields}"}), 400

    try:
        # Create a DataFrame in the same format as the training data
        features = pd.DataFrame([data])

        # Predict the probability of needing maintenance (class 1)
        # predict_proba returns [[prob_class_0, prob_class_1]]
        probability = model.predict_proba(features)[0][1]
        
        # Convert probability to a user-friendly Health Score (0-100)
        # High probability -> Low health score
        health_score = int(100 - (probability * 100))

        # Create a descriptive message
        message = "Vehicle is in good condition."
        if health_score < 50:
            message = "Maintenance is highly recommended."
        elif health_score < 75:
            message = "Vehicle should be checked soon."

        return jsonify({
            "probability": probability,
            "healthScore": health_score,
            "message": message
        })

    except Exception as e:
        return jsonify({"error": f"An error occurred during prediction: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "Python AI Service is running"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)