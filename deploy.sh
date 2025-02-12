#!/bin/bash

# Step 1: Set deployment message (default if not provided)
DEPLOY_MESSAGE=${1:-"Auto-update"}

echo "🚀 Assume you *already* pushed latest code..."

# Step 2: Create a new version with the provided message
echo "📌 Creating new version..."
NEW_VERSION=$(clasp version "$DEPLOY_MESSAGE" | grep -o '[0-9]\+' | tail -1)

if [ -z "$NEW_VERSION" ]; then
  echo "❌ Failed to create a new version"
  exit 1
fi

echo "✅ New version created: $NEW_VERSION"

# Step 3: Find the deployment associated with the highest version number
DEPLOYMENT_ID=$(clasp deployments | awk -v latest="$NEW_VERSION" '$0 ~ "@"latest {print $2}')

if [ -z "$DEPLOYMENT_ID" ]; then
  echo "❌ No matching deployment found for version $NEW_VERSION"
  exit 1
fi

echo "🔄 Updating deployment: $DEPLOYMENT_ID to version $NEW_VERSION"

# Step 4: Update deployment to use the latest version
clasp deploy -i "$DEPLOYMENT_ID" --version "$NEW_VERSION" || { echo "❌ Failed to update deployment"; exit 1; }

echo "🎉 Deployment updated successfully!"