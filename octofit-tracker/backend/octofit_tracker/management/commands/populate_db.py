from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone
import pymongo
import datetime
import random

class Command(BaseCommand):
    help = 'Populate the database with test data for users, teams, activities, leaderboard, and workouts'

    def handle(self, *args, **kwargs):
        # Clear existing data
        self.stdout.write('Clearing existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        # Create users for Mergington High School
        self.stdout.write('Creating users...')
        users = [
            User(username='coach_paul', email='paul.octo@mergington.edu', password='coach123'),
            User(username='student1', email='alex@mergington.edu', password='student123'),
            User(username='student2', email='jamie@mergington.edu', password='student123'),
            User(username='student3', email='jordan@mergington.edu', password='student123'),
            User(username='student4', email='taylor@mergington.edu', password='student123'),
        ]
        
        for user in users:
            user.save()
            self.stdout.write(f'Created user: {user.username}')
        
        # Create teams
        self.stdout.write('Creating teams...')
        teams = [
            Team(name='Octopus Team', description='Team Octopus - The eight-armed fitness warriors', members=['coach_paul', 'student1', 'student2']),
            Team(name='Shark Team', description='Team Shark - Swift and powerful', members=['student3', 'student4'])
        ]
        
        for team in teams:
            team.save()
            self.stdout.write(f'Created team: {team.name}')
        
        # Create activities
        self.stdout.write('Creating activities...')
        activities = [
            Activity(
                user='coach_paul', 
                activity_type='Running', 
                duration=30, 
                distance=5.0, 
                calories=300, 
                date=timezone.now() - datetime.timedelta(days=1)
            ),
            Activity(
                user='student1', 
                activity_type='Swimming', 
                duration=45, 
                distance=1.5, 
                calories=400, 
                date=timezone.now() - datetime.timedelta(days=2)
            ),
            Activity(
                user='student2', 
                activity_type='Cycling', 
                duration=60, 
                distance=15.0, 
                calories=450, 
                date=timezone.now() - datetime.timedelta(days=3)
            ),
            Activity(
                user='student3', 
                activity_type='Weightlifting', 
                duration=40, 
                calories=250, 
                date=timezone.now() - datetime.timedelta(days=2)
            ),
            Activity(
                user='student4', 
                activity_type='Basketball', 
                duration=90, 
                calories=600, 
                date=timezone.now() - datetime.timedelta(days=1)
            ),
        ]
        
        for activity in activities:
            activity.save()
            self.stdout.write(f'Created activity: {activity.activity_type} for {activity.user}')
        
        # Create leaderboard
        self.stdout.write('Creating leaderboard entries...')
        leaderboard_entries = [
            Leaderboard(user='coach_paul', total_points=120, total_activities=5, total_duration=150),
            Leaderboard(user='student1', total_points=95, total_activities=4, total_duration=180),
            Leaderboard(user='student2', total_points=110, total_activities=6, total_duration=200),
            Leaderboard(user='student3', total_points=85, total_activities=3, total_duration=120),
            Leaderboard(user='student4', total_points=100, total_activities=5, total_duration=170),
        ]
        
        for entry in leaderboard_entries:
            entry.save()
            self.stdout.write(f'Created leaderboard entry for: {entry.user} with {entry.total_points} points')
        
        # Create workouts
        self.stdout.write('Creating workouts...')
        workouts = [
            Workout(
                name='Morning Jogging Routine', 
                description='A morning jogging routine to kickstart your day with energy', 
                exercises={
                    'warmup': ['Stretching', 'Light jog'],
                    'main': ['Moderate pace run', 'Sprint intervals'],
                    'cooldown': ['Walking', 'Stretching']
                }, 
                difficulty='Beginner', 
                duration=30
            ),
            Workout(
                name='Swimming Training', 
                description='Improve your swimming technique and endurance', 
                exercises={
                    'warmup': ['Arm circles', 'Leg swings'],
                    'main': ['Freestyle laps', 'Backstroke laps', 'Breaststroke laps'],
                    'cooldown': ['Easy swimming', 'Floating']
                }, 
                difficulty='Intermediate', 
                duration=45
            ),
            Workout(
                name='Cycling Adventure', 
                description='An exciting cycling workout with varying intensities', 
                exercises={
                    'warmup': ['Light pedaling', 'Leg stretches'],
                    'main': ['Hill climbs', 'Speed intervals', 'Steady pace riding'],
                    'cooldown': ['Easy pedaling', 'Stretching']
                }, 
                difficulty='Advanced', 
                duration=60
            ),
            Workout(
                name='Strength Builder', 
                description='Build muscle and strength with this comprehensive routine', 
                exercises={
                    'warmup': ['Jumping jacks', 'Arm circles', 'Bodyweight squats'],
                    'main': ['Push-ups', 'Pull-ups', 'Squats', 'Deadlifts'],
                    'cooldown': ['Walking', 'Stretching']
                }, 
                difficulty='Intermediate', 
                duration=40
            ),
            Workout(
                name='Basketball Skills', 
                description='Improve your basketball skills and cardio', 
                exercises={
                    'warmup': ['Jogging', 'Dynamic stretching'],
                    'main': ['Dribbling drills', 'Shooting practice', 'Defense movements'],
                    'cooldown': ['Free throws', 'Light stretching']
                }, 
                difficulty='Beginner', 
                duration=60
            ),
        ]
        
        for workout in workouts:
            workout.save()
            self.stdout.write(f'Created workout: {workout.name}')
        
        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data for OctoFit!'))
