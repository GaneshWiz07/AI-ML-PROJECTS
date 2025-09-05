from flask import Flask,render_template,request
import numpy as np
import pickle
import math
from datetime import datetime

app=Flask(__name__)

model=pickle.load(open('model.pkl','rb'))

# Store last prediction data
last_prediction = {
    'result': None,
    'timestamp': None,
    'inputs': None
}

@app.route('/')
def home():
    return render_template('index.html', last_prediction=last_prediction)

@app.route('/predict',methods=['POST'])
def predict():
    global last_prediction
    
    input_features=[int(x) for x in request.form.values()]
    final_features=np.array(input_features).reshape(1,-1)
    prediction=model.predict(final_features)
    output=round(prediction[0],2)
    
    # Store prediction data
    last_prediction = {
        'result': math.floor(output),
        'timestamp': datetime.now().strftime('%d-%m-%Y %I:%M:%S %p'),
        'inputs': {
            'price': input_features[0],
            'population': input_features[1],
            'income': input_features[2],
            'parking': input_features[3]
        }
    }
    
    return render_template('index.html', 
                         prediction_text=f'Number of weekly riders should be {math.floor(output)}',
                         last_prediction=last_prediction,
                         new_prediction=True)

if __name__=='__main__':
    app.run(debug=True)
