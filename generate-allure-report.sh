#!/bin/bash

# Navigate to the project directory
cd /Users/MWE-PROJECT || exit

# Generate the Allure report (clean previous results)
allure generate allure-results --clean -o allure-report

# Open the generated report
allure open allure-report

