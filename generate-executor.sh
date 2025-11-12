#!/bin/bash

RESULTS_DIR="allure-results"
mkdir -p $RESULTS_DIR

cat > $RESULTS_DIR/executor.json <<EOL
{
  "name": "Local Run",
  "type": "local",
  "url": "",
  "buildOrder": 1,
  "buildName": "iOS 26.1 - iPad 9th generation",
  "buildUrl": "",
  "reportUrl": "",
  "reportName": "Allure Report"
}
EOL

echo "✅ Allure executor.json created"
