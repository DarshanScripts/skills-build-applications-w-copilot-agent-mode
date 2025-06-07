#!/bin/bash

# Check MongoDB status
echo "MONGODB STATUS:"
sudo service mongodb status

# Verify MongoDB is running
echo -e "\nCHECKING MONGO PROCESSES:"
ps aux | grep mongo

# Try to connect to MongoDB
echo -e "\nTRYING TO CONNECT TO MONGODB:"
echo "show dbs" | mongo

# Create octofit_db database
echo -e "\nCREATING OCTOFIT_DB DATABASE:"
mongo --eval "db = db.getSiblingDB('octofit_db'); db.createCollection('users')"

# Create collections and indexes
echo -e "\nCREATING COLLECTIONS AND INDEXES:"
mongo --eval "
db = db.getSiblingDB('octofit_db'); 
db.createCollection('teams');
db.createCollection('activity');
db.createCollection('leaderboard');
db.createCollection('workouts');
db.users.createIndex({ 'email': 1 }, { unique: true });
db.teams.createIndex({ 'name': 1 }, { unique: true });
db.activity.createIndex({ 'activity_id': 1 }, { unique: true });
db.leaderboard.createIndex({ 'leaderboard_id': 1 }, { unique: true });
db.workouts.createIndex({ 'workout_id': 1 }, { unique: true });"

# List collections
echo -e "\nLISTING COLLECTIONS:"
mongo --eval "db = db.getSiblingDB('octofit_db'); print(db.getCollectionNames())"
