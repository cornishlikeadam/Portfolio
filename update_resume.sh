#!/bin/bash

echo "🔄 Rebuilding Resume AI app..."
cd ../resume-ai

# Build the Vite react app
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Check your React code in scratch/resume-ai for errors."
    exit 1
fi

echo "✅ Build successful!"
echo "📦 Copying built files to portfolio/resume-ai..."

cd ../portfolio
mkdir -p resume-ai
# Clear old files safely
rm -rf resume-ai/*
# Copy new distribution inside
cp -r ../resume-ai/dist/* resume-ai/

echo "🚀 Update complete! Your portfolio now has the latest version of Resume AI."
echo "You can now commit and push the portfolio directory to update your live website."
