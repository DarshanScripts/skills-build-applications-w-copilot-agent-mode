#!/bin/bash

# Navigate to the backend directory
cd /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/backend

# Ensure virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install packages one by one
echo "Installing Django..."
pip install Django==4.1

echo "Installing djangorestframework..."
pip install djangorestframework==3.14.0

echo "Installing django-allauth..."
pip install django-allauth==0.51.0

echo "Installing django-cors-headers..."
pip install django-cors-headers==3.14.0

echo "Installing dj-rest-auth..."
pip install dj-rest-auth==2.2.5

echo "Installing pymongo..."
pip install pymongo==3.12.0

echo "Installing sqlparse..."
pip install sqlparse==0.2.4

# Check installation
echo "Checking installation..."
pip freeze

echo "Installation complete!"
