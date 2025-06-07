from djongo import models

class User(models.Model):
    _id = models.ObjectIdField()
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    
    def __str__(self):
        return self.username

class Team(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    members = models.JSONField(default=list)
    
    def __str__(self):
        return self.name

class Activity(models.Model):
    _id = models.ObjectIdField()
    user = models.CharField(max_length=100)
    activity_type = models.CharField(max_length=50)
    duration = models.IntegerField()  # in minutes
    distance = models.FloatField(null=True, blank=True)  # in kilometers
    calories = models.IntegerField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.activity_type} by {self.user} on {self.date.strftime('%Y-%m-%d')}"

class Leaderboard(models.Model):
    _id = models.ObjectIdField()
    user = models.CharField(max_length=100)
    total_points = models.IntegerField(default=0)
    total_activities = models.IntegerField(default=0)
    total_duration = models.IntegerField(default=0)  # in minutes
    
    def __str__(self):
        return f"{self.user} - {self.total_points} points"

class Workout(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    description = models.TextField()
    exercises = models.JSONField()
    difficulty = models.CharField(max_length=20)
    duration = models.IntegerField()  # in minutes
    
    def __str__(self):
        return self.name
