#!/usr/bin/env python3

import pymongo
import sys

try:
    # Connect to MongoDB
    client = pymongo.MongoClient("mongodb://localhost:27017/")
    
    # Get or create database
    db = client["octofit_db"]
    
    # Create collections
    users = db["users"]
    teams = db["teams"]
    activity = db["activity"]
    leaderboard = db["leaderboard"]
    workouts = db["workouts"]
    
    # Create indexes
    users.create_index([("email", pymongo.ASCENDING)], unique=True)
    teams.create_index([("name", pymongo.ASCENDING)], unique=True)
    activity.create_index([("activity_id", pymongo.ASCENDING)], unique=True)
    leaderboard.create_index([("leaderboard_id", pymongo.ASCENDING)], unique=True)
    workouts.create_index([("workout_id", pymongo.ASCENDING)], unique=True)
    
    # Insert a test document
    test_user = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123"
    }
    
    # Try to insert the test user, ignoring duplicate key errors
    try:
        users.insert_one(test_user)
        print("Test user inserted successfully")
    except pymongo.errors.DuplicateKeyError:
        print("Test user already exists")
    
    # List all collections in the database
    print("\nCollections in octofit_db:")
    for collection in db.list_collection_names():
        print(f" - {collection}")
    
    # Count documents in each collection
    print("\nDocument counts:")
    print(f"Users: {users.count_documents({})}")
    print(f"Teams: {teams.count_documents({})}")
    print(f"Activity: {activity.count_documents({})}")
    print(f"Leaderboard: {leaderboard.count_documents({})}")
    print(f"Workouts: {workouts.count_documents({})}")
    
    print("\nDatabase initialization completed successfully!")
    
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
