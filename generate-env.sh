#!/bin/bash

RESULTS_DIR="allure-results"
mkdir -p $RESULTS_DIR

cat > $RESULTS_DIR/environment.properties <<EOL
Platform=iOS
PlatformVersion=26.4.2
Device=iPad Pro 11-inch (M5)
App=MWE
Automation=XCUITest
UDID=00008142-001C51601198401C
EOL

echo "✅ Allure environment.properties created"
