from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout

# Register models with the admin site
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email')
    search_fields = ('username', 'email')

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'activity_type', 'duration', 'date')
    list_filter = ('activity_type', 'date')
    search_fields = ('user', 'activity_type')

@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('user', 'total_points', 'total_activities', 'total_duration')
    list_filter = ('total_points', 'total_activities')
    search_fields = ('user',)

@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'difficulty', 'duration')
    list_filter = ('difficulty', 'duration')
    search_fields = ('name', 'description')
