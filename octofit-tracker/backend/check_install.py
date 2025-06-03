import sys
import os
import subprocess

# Print Python version
print(f"Python version: {sys.version}")

# Print virtual environment path
print(f"Virtual environment: {os.environ.get('VIRTUAL_ENV', 'Not activated')}")

# Run pip freeze command and capture output
try:
    result = subprocess.run(["pip", "freeze"], capture_output=True, text=True)
    print("\nInstalled packages:")
    print(result.stdout)
except Exception as e:
    print(f"Error running pip freeze: {e}")
