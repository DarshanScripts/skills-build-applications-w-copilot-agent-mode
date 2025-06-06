from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer

@api_view(['GET'])
def api_root(request, format=None):
    # Always use the codespace URL for consistency
    # Codespace URL: didactic-telegram-r4gxq4jpqgprhxx9r-8000.app.github.dev
    codespace_url = 'https://didactic-telegram-r4gxq4jpqgprhxx9r-8000.app.github.dev'
    
    if 'github.dev' in request.get_host() or 'githubpreview.dev' in request.get_host():
        base_url = codespace_url
    else:
        # For local development
        base_url = request.build_absolute_uri('/')[:-1]
    
    # Return with formatted URLs to the API endpoints
    # Include the codespace domain name in the URLs
    return Response({
        'base_url': base_url,
        'api_version': 'v1',
        'users': f'{base_url}/api/users/',
        'teams': f'{base_url}/api/teams/',
        'activities': f'{base_url}/api/activities/',
        'leaderboard': f'{base_url}/api/leaderboard/',
        'workouts': f'{base_url}/api/workouts/'
    })

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
