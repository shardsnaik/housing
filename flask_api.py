# from django.shortcuts import render
# import pandas as pd

import pickle
from flask import Flask, request, app, jsonify, url_for, render_template
import numpy as np

app = Flask(__name__)
regmodel = pickle.load(open('C:\\Users\\Public\\React-JS\\House-Pricing\\housing\\reg_model.pkl', 'rb'))
scaler = pickle.load(open('C:\\Users\\Public\\React-JS\\House-Pricing\\housing\\scalling_data.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict_api():
  data = request.json['data']
  print(data)
  print(np.array(list(data.values())).reshape(1, -1))
  new_data = scaler.transform(np.array(list(data.values())).reshape(1, -1))
  output= regmodel.predict(new_data)
  print(output[0])
  return jsonify(output[0])
    # return 'dddd'
if __name__ == '__main__':
  app.run(debug=True)

