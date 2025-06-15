#!/bin/bash
cd ..  # Move to the actual git root
git diff HEAD^ HEAD --quiet --exit-code -- frontend/
if [ $? -eq 0 ]; then
  echo "🛑 No changes in frontend directory, skipping build"
  exit 0
else
  echo "✅ Changes detected in frontend directory, proceeding with build"
  exit 1
fi
