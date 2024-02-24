from datetime import datetime, timedelta
from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS  # Import CORS from flask_cors
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# Load the trained Ridge Regression model
ridge_model = joblib.load('ridge_model.pkl')

# API endpoint to get estimated waiting time
@app.route('/get_waiting_time', methods=['POST'])
def get_waiting_time():
    try:
        # Get data from the frontend
        input_data = request.get_json()

        # Convert appointment and check-in times to seconds
        base_timestamp = datetime(1970, 1, 1)  # Unix epoch
        appointment_time = (datetime.strptime(input_data['Appointment_Time'], '%Y-%m-%d %H:%M:%S') - base_timestamp).total_seconds()
        checkin_time = (datetime.strptime(input_data['Checkin_Time'], '%Y-%m-%d %H:%M:%S') - base_timestamp).total_seconds()

        # Use the model to predict waiting time
        input_features = [[appointment_time, checkin_time]]
        estimated_waiting_time = ridge_model.predict(input_features)[0]

        # Return the estimated waiting time
        if estimated_waiting_time <= 0:
            estimated_waiting_timed = estimated_waiting_time * -1
        else:
            estimated_waiting_timed = estimated_waiting_time
        response = {
            'estimated_waiting_time': estimated_waiting_timed
        }
        print(F"{estimated_waiting_timed} is given ")
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
