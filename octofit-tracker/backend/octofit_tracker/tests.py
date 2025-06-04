from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout

class OctoFitModelTests(TestCase):
    def setUp(self):
        # Create test user
        self.test_user = User.objects.create(
            username='testuser',
            email='test@example.com',
            password='password123'
        )
        
        # Create test team
        self.test_team = Team.objects.create(
            name='Test Team',
            description='A team for testing',
            members=['testuser']
        )
        
    def test_user_creation(self):
        """Test that user model creates users correctly"""
        self.assertEqual(self.test_user.username, 'testuser')
        self.assertEqual(self.test_user.email, 'test@example.com')
        
    def test_team_creation(self):
        """Test that team model creates teams correctly"""
        self.assertEqual(self.test_team.name, 'Test Team')
        self.assertEqual(self.test_team.members[0], 'testuser')


class OctoFitAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create test user
        self.test_user = User.objects.create(
            username='testuser',
            email='test@example.com',
            password='password123'
        )
        
        # Create test activity
        self.test_activity = Activity.objects.create(
            user='testuser',
            activity_type='running',
            duration=30,
            distance=5.0,
            calories=300
        )
        
    def test_get_users(self):
        """Test API can get users"""
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)
        
    def test_create_activity(self):
        """Test API can create an activity"""
        activity_data = {
            'user': 'testuser',
            'activity_type': 'cycling',
            'duration': 45,
            'distance': 15.0,
            'calories': 400
        }
        response = self.client.post('/api/activities/', activity_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Activity.objects.count(), 2)
