# Importing related libraries and modules
from flask import Flask, jsonify, render_template
import pandas as pd
import joblib

from urllib.parse import unquote

# Use Flask CORS Library to allow access to fetch from Python Flask API routes (when running locally) that would have otherwise been blocked by the CORS policy by default
from flask_cors import CORS

#################################################
# Import CSV Dataset & Load Data Model
#################################################

# Reference: https://www.kaggle.com/datasets/akshatgupta7/crop-yield-in-indian-states-dataset/data
yield_df = pd.read_csv("final_crop_yield.csv")

model_pipeline = joblib.load('./pkl/RF Model.pkl')

#################################################
# Flask API App Setup
#################################################
 
# Create a Flask web application instance
app = Flask(__name__)

# [IMPORTANT] Enable CORS for all API routes; in order for JS scripts to connect to Flask API routes if Flask instance is running locally
CORS(app)

# From the Flask library, configure to not sort the keys when serializing JSON responses
app.json.sort_keys = False


#################################################
# Flask API Routes
#################################################

############# Route #1 (Homepage) ###############
@app.route("/")
def homepage():
    # Run the index HTML webpage (homepage.html)
    return render_template("index.html")


############# Route #2 (Feature Options) ###############
@app.route("/api/v1.0/feature_options")
def feature_options():
    #  Populate the interactive dropdown box elements on the webpage
    #  Returns the unique list of crops and seasons

    crop_list = yield_df["Crop"].unique().tolist()
    season_list = yield_df["Season"].unique().tolist()


    # Stores the information in a dictionary
    results = {
        "crops": crop_list,
        "seasons": season_list,
    }    

    # Return the JSON 'results' dictionary that includes all options to populate for the HTML interactive dropdown elements
    return jsonify(results)


############# Route #3 ([Dynamic API Route]  Run ML Model Prediction based on Test Data Applied by User) ###############
@app.route("/api/v1.0/<crop_str>/<season_str>/<area_num>/<production_num>/<annual_rainfall_num>/<fertilizer_num>/<pesticide_num>", methods = ['GET'])
def filtered_data(crop_str, season_str, area_num, production_num, annual_rainfall_num, fertilizer_num, pesticide_num):
    # Used everytime the user runs a new prediction from the webpage (index.html)
    # Returns the predicted crop yield value based on the user's input

    if (crop_str == "ArharTur") :
        crop_str = "Arhar/Tur"

    print(unquote(crop_str))
    print(season_str)

    new_test_df = pd.DataFrame({
        "Crop": [unquote(crop_str)],                        # Using urllib.parse, perform URL decoding the string element (e.g. Rapeseed%20%26Mustard ----> Rapeseed &Mustard)
        "Season": [unquote(season_str)],                    
        "Area": [float(area_num)],
        "Production": [float(production_num)],
        "Annual_Rainfall": [float(annual_rainfall_num)],
        "Fertilizer": [float(fertilizer_num)],
        "Pesticide": [float(pesticide_num)]
    })

    # Use the trained model to predict the output for the new data
    predicted_value = model_pipeline.predict(new_test_df).tolist()
    
    # Stores the Predicted Value in a new dictionary prior to being JSONified:
    results = {"predicted_value": predicted_value}  

    # Return the JSON 'results' dictionary the selected filter options and final queried data
    return jsonify(results)


# Run the Flask app
if __name__ == '__main__':
    app.run(debug = True)