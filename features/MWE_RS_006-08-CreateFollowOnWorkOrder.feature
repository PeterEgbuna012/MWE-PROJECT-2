Feature: MWE_RS_006 - 08 - Create Follow On Work Order  (Add to backlog, FIFI, Assign to me)

  Scenario Outline: create a follow on wo
    Given I am on the Init page
    When I set Region select field
    When I set Region as "<country>"
    When I set "<EnvCode>" into Environment Code input field
    Then I can connect to the Environment
    Then signIn option shows up
    When I switch to the web view context
    Then I enter username as "<username>"
    And I enter password as "<password>"
    And I click on "Sign In" button
    And I switch to native view context
    And I see allow button
    When I click on "Reject" button
    Then The Worklist page is open
    Then I click on "first" WO
    Then WO page is "Shown"
    Then I click on "START ICON" button
    Then I click on "START WORK" button
    Then The status of the work Order is in "In Progress"
    Then I click on "MORE ACTION ICON" button
    Then I click on "CREATE FOLLOW-ON WORK ORDER" button
    Then the Follow-On page should be "Shown"
    Then I click on "Add to backlog" outcome and select "Add to backlog"
    Then I verify location field is populated
    Then I verify asset field is populated
    Then I click on "SELECT A TEMPLATE " button 
    Then I click on "Fault reported during exam (Additional arising work)" button
   # And I set "Description" value field to "TESTING"
    Then I click on "NEXT" button
    Then I click on "FAILURE CLASS" option
    Then I click on "BATTERY & CONTROL SYSTEMS" option
    Then I click on "PROBLEM CLASS" option
    Then I click on "EXAM" option
    Then I click on "CAUSE CLASS" option
    Then I click on "DAMAGED" option
    Then I click on "REMEDY CLASS" option
    Then I click on "COMPONENT REPAIRED" option
    Then I click on "CREATE FOLLOW-ON" button
    Then I take a screenshot
    Then I click on "HISTORY TAB" button
    Then I take a screenshot
    Then I click on "DETAILS TAB" button
    Then I navigate to "back"
    Then The Worklist page is open
    When I click on "first" WO
    Then WO page is "Shown"
    Then I click on "MORE ACTION ICON" button
    Then I click on "CREATE FOLLOW-ON WORK ORDER" button
    Then the Follow-On page should be "Shown"
    Then I click on "Add to backlog" outcome and select "Found It, Fixed It"
    Then I verify location field is populated
    Then I verify asset field is populated
    Then I click on "SELECT A TEMPLATE " button 
    Then I click on "Defect Investigation" button
    Then I click on "NEXT" button
   # And I set "Description" value field to "TESTING"
   Then I click on "FAILURE CLASS" option
    Then I click on "DOORS" option
    Then I click on "PROBLEM CLASS" option
    Then I click on "EXAM" option
    Then I click on "CAUSE CLASS" option
    Then I click on "DAMAGED" option
    Then I click on "REMEDY CLASS" option
    Then I click on "COMPONENT REPAIRED" option
    Then I click on "CREATE FOLLOW-ON" button
    Then I take a screenshot
    Then I click on "HISTORY TAB" button
    Then I take a screenshot
    Then I click on "DETAILS TAB" button
    Then I navigate to "back"
    Then The Worklist page is open
    When I click on "first" WO
    Then WO page is "Shown"
    Then I click on "MORE ACTION ICON" button
    Then I click on "CREATE FOLLOW-ON WORK ORDER" button
    Then the Follow-On page should be "Shown"
    Then I click on "Add to backlog" outcome and select "Assign to me"
    Then I verify location field is populated
    Then I verify asset field is populated
    Then I click on "SELECT A TEMPLATE " button 
    Then I click on "Out of Service (to be fixed immediately)" button
    #And I set "Description" value field to "TESTING"
    Then I click on "NEXT" button
    Then I click on "FAILURE CLASS" option
    Then I click on "BRAKES - AIR/VACUUM" option
    Then I click on "PROBLEM CLASS" option
    Then I click on "BLOCK/PADS" option
    Then I click on "CAUSE CLASS" option
    Then I click on "DAMAGED" option
    Then I click on "REMEDY CLASS" option
    Then I click on "COMPONENT REPAIRED" option
    Then I click on "CREATE FOLLOW-ON" button
    Then I take a screenshot
    Then I click on "PAUSE ICON" button
    Then I click on "PAUSE" button
    Then I click on "SELECT OUTCOME" option
    Then I click on "ON HOLD" button
    Then I click on "PAUSE WORK ORDER" button
    Then I click on "HISTORY TAB" button
    Then I take a screenshot
    Then I navigate to "back"
    Then The Worklist page is open

  Examples:
      | country | EnvCode        | username  | password   |
      | Europe  | rude-eagle-57  | Ian.nuttall@NTSGLOBAL.UK | mwe2025 |
