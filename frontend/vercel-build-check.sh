#!/bin/bash
echo " Started at $(pwd)"
cd ..  # Move to the actual git root
echo "📍 Working from: $(pwd)"
git diff HEAD^ HEAD --quiet --exit-code -- frontend/
if [ $? -eq 0 ]; then
  echo "🛑 No changes in frontend directory, skipping build"
  exit 0
else
  echo "✅ Changes detected in frontend directory, proceeding with build"
  exit 1
fi
