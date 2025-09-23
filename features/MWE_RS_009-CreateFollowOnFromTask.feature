Feature: MWE_RS_009 - Create Follow On From Task

  Scenario Outline: Create Follow On From Task
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
    When I click at "first" WO
    Then I click on "START ICON" button
    Then I click on "START WORK" button
    Then The status of the work Order is in "In Progress"
    Then I navigate "Work" tab
    When I press "task" widget
    When I tap on task with number "10."
    Then "10" page appears
    Then I click on "" button
    Then I click on "CREATE FOLLOW ON" button
    Then the Follow-On page should be "Shown"
    Then I click on "Add to backlog" outcome and select "Add to backlog"
    Then I verify location field is populated
    Then I verify asset field is populated
    Then I click on "SELECT A TEMPLATE " button 
    Then I click on "377 Auxillaries" button
   # And I set "Description" value field to "TESTING"
    Then I click on "NEXT" button
   # Then I click on "377: AUXILIARIES" option
    Then I click on "PROBLEM CLASS" option
    Then I click on "ACTIVATED" option
    Then I click on "CAUSE CLASS" option
    Then I click on "BURNT" option
    Then I click on "REMEDY CLASS" option
    Then I click on "REPAIR CARRIED OUT" option
    Then I click on "CREATE FOLLOW-ON" button
    Then I take a screenshot
    Then I navigate to "back"
    Then I navigate to "back"
    Then I click on "PAUSE ICON" button
    Then I click on "PAUSE" button
    Then I click on "PAUSE WORK ORDER" button
    Then I click on "HISTORY TAB" button
    Then I take a screenshot
    Then I click on "DETAILS TAB" button
    Then I navigate to "back"
    Then The Worklist page is open


    Examples:
      | country | EnvCode        | username        | password        |
      | Europe  | lucky-liger-8  | CBRUNS          | cbruns          |