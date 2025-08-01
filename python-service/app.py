import os
from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

# --- Model Loading ---
# In a real scenario, you'd train a model. For now, we'll create a placeholder
# rule-based "model" and save it with joblib to simulate a real ML workflow.
def create_placeholder_model():
    """This function simulates a trained model."""
    # This is not a real model, but a function that follows rules.
    # We save it to a .pkl file to show how a real model would be loaded.
    def predict_maintenance(data):
        # data is expected to be a dictionary like {'mileage': 50000, 'age': 3, 'vehicle_type': 'truck'}
        mileage = data.get('mileage', 0)
        age = data.get('age', 0)
        
        score = 0
        # High mileage increases the chance of maintenance
        if mileage > 80000:
            score += 40
        elif mileage > 50000:
            score += 20
            
        # Older vehicles are more likely to need maintenance
        if age > 5:
            score += 30
        elif age > 2:
            score += 15

        # If score is high, maintenance is needed
        if score > 50:
            return {"prediction": 1, "message": "Maintenance recommended soon."}
        else:
            return {"prediction": 0, "message": "Vehicle is in good condition."}

    # Create model directory if it doesn't exist
    if not os.path.exists('models'):
        os.makedirs('models')

    # Save the function to a file
    joblib.dump(predict_maintenance, 'models/placeholder_model.pkl')


# --- API Endpoints ---
@app.route('/predict', methods=['POST'])
def predict():
    """
    API endpoint to predict vehicle maintenance.
    Expects JSON like:
    {
        "mileage": 75000,
        "age": 4,
        "vehicle_type": "sedan"
    }
    """
    try:
        # Load the placeholder model from the file
        model = joblib.load('models/placeholder_model.pkl')
    except FileNotFoundError:
        return jsonify({"error": "Model not found. Please ensure the service has started correctly."}), 500

    if not request.json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.json
    
    # Basic validation
    if 'mileage' not in data or 'age' not in data:
        return jsonify({"error": "Missing 'mileage' or 'age' in request body"}), 400

    try:
        # Use the loaded model (function) to get a prediction
        result = model(data)
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"An error occurred during prediction: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to confirm the service is running."""
    return jsonify({"status": "Python AI Service is running"}), 200


if __name__ == '__main__':
    # Create the placeholder model file on first run
    if not os.path.exists('models/placeholder_model.pkl'):
        create_placeholder_model()
        print("Placeholder model created and saved.")
        
    # In a real production environment, you would use a production-ready WSGI server like Gunicorn.
    app.run(host='0.0.0.0', port=5001, debug=True)