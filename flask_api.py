# # from django.shortcuts import render
# # import pandas as pd

# # import pickle
# # from flask import Flask, request, app, jsonify, url_for, render_template
# # import numpy as np

# # app = Flask(__name__)
# # regmodel = pickle.load(open('C:\\Users\\Public\\React-JS\\House-Pricing\\housing\\reg_model.pkl', 'rb'))
# # scaler = pickle.load(open('C:\\Users\\Public\\React-JS\\House-Pricing\\housing\\scalling_data.pkl', 'rb'))

# # @app.route('/predict_api', methods=['POST'])
# # def predict_api():
# #   data = request.json['data']
# #   print(data)
# #   print(np.array(list(data.values())).reshape(1, -1))
# #   new_data = scaler.transform(np.array(list(data.values())).reshape(1, -1))
# #   output= regmodel.predict(new_data)
# #   print(output[0])
# #   return jsonify(output[0])
# #     # return 'dddd'
# # if __name__ == '__main__':
# #   app.run(debug=True)


from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
regmodel = pickle.load(open('C:\\Users\\Public\\React-JS\\House-Pricing\\housing\\reg_model.pkl', 'rb'))
scaler = pickle.load(open('C:\\Users\\Public\\React-JS\\House-Pricing\\housing\\scalling_data.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['data']
    # reciveing the json data from requests
    # print(data)
    # print('--->')
    # convert the data into numpy array
    features = np.array([
        data['MedInc'],
         data['HouseAge'],
        data['AveRooms'],
        data['AveBedrms'],
        data['Population'],
        data['AveOccups'],
        data['Latitude'],
        data['Longitude']
    ]).reshape(1, -1)
    # features = float(features)
    # scale the /features before prediction 
    scaled_features = scaler.transform(features) 

    # get the prediction from the model
    pred = regmodel.predict(scaled_features)

    return jsonify(pred[0])
    # data = [ float(x) for x in request.form.values() ]
    # print(data)

if __name__ == '__main__':
    app.run(debug=True)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import numpy as np
# import pickle

# app = Flask(__name__)
# CORS(app)

# # Load your trained model and scaler
# regmodel = pickle.load(open('C:\\Users\\Public\\React-JS\\House-Pricing\\housing\\reg_model.pkl', 'rb'))
# scaler = pickle.load(open('C:\\Users\\Public\\React-JS\\House-Pricing\\housing\\scalling_data.pkl', 'rb'))

# @app.route('/predict', methods=['POST'])
# def predict_api():
#     try:
#         # Retrieve JSON data from the request
#         data = request.json.get('data', {})

#         # Ensure that the necessary keys are in the request
#         required_features = ['MedInc', 'HouseAge', 'AveRooms', 'AveBedrms', 'Population', 'AveOccups', 'Latitude', 'Longitude']

#         # Check if any required feature is missing or empty
#         for feature in required_features:
#             if feature not in data or not isinstance(data[feature], (int, float)):
#                 return jsonify({'error': f'Missing or invalid value for {feature}'}), 400

#         # Convert the data into a numpy array and reshape it
#         features = np.array([
#             data['MedInc'],
#             data['HouseAge'],
#             data['AveRooms'],
#             data['AveBedrms'],
#             data['Population'],
#             data['AveOccups'],
#             data['Latitude'],
#             data['Longitude']
#         ]).reshape(1, -1)

#         # Scale the features before prediction
#         scaled_features = scaler.transform(features)

#         # Get prediction from the model
#         prediction = regmodel.predict(scaled_features)

#         # Return the prediction as a JSON response
#         return jsonify(prediction[0])
    
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
