#!/bin/bash

RESULTS_DIR="allure-results"
mkdir -p $RESULTS_DIR

cat > $RESULTS_DIR/environment.properties <<EOL
Platform=iOS
PlatformVersion=18.3
Device=iPad 9th generation
App=MWE
Automation=XCUITest
UDID=00008030-000621A90AD0202E
EOL

echo "✅ Allure environment.properties created"
