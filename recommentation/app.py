import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify
import pickle
from pymongo import MongoClient
from collections import Counter
from bson import ObjectId  # Import ObjectId for conversion
import os
from dotenv import load_dotenv

from flask_cors import CORS



# Load environment variables from .env file
load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")

# Connect to MongoDB
client = MongoClient(MONGODB_URI)
db = client["findmymess"]
orders_collection = db["orders"]
products_collection = db["products"]


# Flask API
app = Flask(__name__)
CORS(app)

@app.route("/recommend/<user_id>", methods=["POST"])
def recommend(user_id):

    # Fetch user order history
    orders_data = list(orders_collection.find({}, {"_id": 0, "userId": 1, "items": 1}))

    # Convert order data to a structured format
    processed_orders = []
    for order in orders_data:
        for item in order["items"]:
            if isinstance(item, dict) and "name" in item:  # Ensure item is a dict and contains 'name'
                processed_orders.append({"user_id": order["userId"], "dish": item["name"]})


    df = pd.DataFrame(processed_orders)

    if df.empty:
        raise ValueError("No order data found in MongoDB.")

    # Create dish matrix
    dish_matrix = pd.get_dummies(df["dish"])
    user_profiles = df["user_id"].values.reshape(-1, 1)
    dish_matrix = np.hstack((user_profiles, dish_matrix))

    # Compute similarity
    similarity_matrix = cosine_similarity(dish_matrix[:, 1:])

    # Save model
    with open("recommendation_model.pkl", "wb") as f:
        pickle.dump(similarity_matrix, f)


    if user_id not in df["user_id"].values:
        return jsonify({"error": "User not found"})

    user_index = np.where(df["user_id"] == user_id)[0][0]
    similar_dishes = similarity_matrix[user_index].argsort()[::-1]
    recommended_dish_names = [df.iloc[i]["dish"] for i in similar_dishes if df.iloc[i]["user_id"] != user_id]
    # Fetch dish details from MongoDB
    recommended_dishes = list(products_collection.find({"name": {"$in": recommended_dish_names}}))

     # Convert `_id` from ObjectId to string
    for dish in recommended_dishes:
        dish["_id"] = str(dish["_id"])  

    recommended_dishes_sorted = sorted(recommended_dishes, key=lambda x: recommended_dish_names.index(x["name"]))

    return jsonify({"recommendations": recommended_dishes_sorted[:3]})

@app.route("/popular-dishes", methods=["GET"])
def get_popular_dishes():
    # Fetch all orders from MongoDB
    orders = list(orders_collection.find({}, {"_id": 0, "items": 1}))

    # Extract dish names
    all_dishes = []
    for order in orders:
        for item in order["items"]:  # Assuming "items" is a list of dish names
            if isinstance(item, dict) and "name" in item:
                all_dishes.append(item["name"])  # Extract only the name
            elif isinstance(item, str):
                all_dishes.append(item)  # If it's already a string, keep it

    # Count occurrences of each dish
    dish_counts = Counter(all_dishes)

    # Get the top 5 most ordered dishes
    top_dishes = [dish[0] for dish in dish_counts.most_common(5)]

    # Fetch full product details from the products collection
    popular_products = list(products_collection.find({"name": {"$in": top_dishes}}))

     # Convert `_id` from ObjectId to string
    for dish in popular_products:
        dish["_id"] = str(dish["_id"]) 

    # **Sort `popular_products` based on the order in `top_dishes`**
    popular_products_sorted = sorted(popular_products, key=lambda x: top_dishes.index(x["name"]))

    return jsonify({"popular_dishes": popular_products_sorted})

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
