#!/bin/bash

# Check MongoDB status
echo "Checking MongoDB status..."
sudo service mongodb status

# Restart MongoDB if needed
echo "Restarting MongoDB..."
sudo service mongodb restart

# Wait a moment for MongoDB to start
sleep 2

# Initialize database
echo "Initializing octofit_db..."
mongo <<EOF
use octofit_db;

// Create collections
db.createCollection('users');
db.createCollection('teams');
db.createCollection('activity');
db.createCollection('leaderboard');
db.createCollection('workouts');

// Create indexes
db.users.createIndex({ 'email': 1 }, { unique: true });
db.teams.createIndex({ 'name': 1 }, { unique: true });
db.activity.createIndex({ 'activity_id': 1 }, { unique: true });
db.leaderboard.createIndex({ 'leaderboard_id': 1 }, { unique: true });
db.workouts.createIndex({ 'workout_id': 1 }, { unique: true });

// Insert test user
db.users.insert({username: 'testuser', email: 'test@example.com', password: 'password123'});

// Show collections
print("Collections in octofit_db:");
db.getCollectionNames().forEach(function(collection) {
  print(" - " + collection);
});

// Show test user
print("Test user:");
printjson(db.users.findOne({username: 'testuser'}));
EOF

echo "Database initialization completed!"
