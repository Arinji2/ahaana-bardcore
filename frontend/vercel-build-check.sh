#!/bin/bash
echo "🚀 Started at $(pwd)"

# Navigate to the repository root
cd "$(dirname "$0")/.."
echo "📍 Working from: $(pwd)"

# Set git directory explicitly
export GIT_DIR="$(pwd)/.git"
export GIT_WORK_TREE="$(pwd)"

# Check if we're in Vercel's environment
if [ -n "$VERCEL" ]; then
    echo "🔧 Detected Vercel environment"
    
    # In Vercel, we can check the commit that triggered the build
    if [ -n "$VERCEL_GIT_COMMIT_SHA" ] && [ -n "$VERCEL_GIT_PREVIOUS_SHA" ]; then
        echo "📋 Comparing commits: $VERCEL_GIT_PREVIOUS_SHA -> $VERCEL_GIT_COMMIT_SHA"
        
        # Use Vercel's environment variables for commit comparison
        if git diff --quiet "$VERCEL_GIT_PREVIOUS_SHA" "$VERCEL_GIT_COMMIT_SHA" -- frontend/ 2>/dev/null; then
            echo "🛑 No changes in frontend directory, skipping build"
            exit 0
        else
            echo "✅ Changes detected in frontend directory, proceeding with build"
            git diff --name-only "$VERCEL_GIT_PREVIOUS_SHA" "$VERCEL_GIT_COMMIT_SHA" -- frontend/ 2>/dev/null || echo "(Could not list changed files)"
            exit 1
        fi
    else
        echo "⚠️  No previous commit info available, proceeding with build"
        exit 1
    fi
else
    echo "🏠 Local environment detected"
    
    # Local development - use standard git diff
    if ! git rev-parse HEAD^ >/dev/null 2>&1; then
        echo "⚠️  No previous commit to compare with, proceeding with build"
        exit 1
    fi
    
    if git diff --quiet HEAD^ HEAD -- frontend/ 2>/dev/null; then
        echo "🛑 No changes in frontend directory, skipping build"
        exit 0
    else
        echo "✅ Changes detected in frontend directory, proceeding with build"
        git diff --name-only HEAD^ HEAD -- frontend/ 2>/dev/null
        exit 1
    fi
fi
