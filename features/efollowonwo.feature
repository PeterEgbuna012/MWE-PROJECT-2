Feature: Create Follow-On Work Orders (Add to backlog, FIFI, Assign to me)

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
    When I click at "first" WO
    Then WO page is "Shown"
    Then I click on "START ICON" button
    Then I click on "START WORK" button
    Then I click on "MORE ACTION ICON" button
    Then I click on "Create Follow-On Work Order" button
    When I click at "Add to backlog" option
    Then I click on "Add to backlog" button
    Then I verify location field is populated
    Then I enter value in "Please Enter Description"
    When I click at "Select a Template" option
    Then I click on "377 Auxillaries" button
    Then I click on "NEXT" button
    Then I click at "Select Failure Class..." option
    Then I click on "377:Auxillaries" button
    Then I click at "Select Failure Problem..." option
    Then I click on "CRACKED" button
    Then I click at "Select Failure Cause..." option
    Then I click on "BURNT" button
    Then I click at "Select Failure Remedy..." option
    Then I click on "REPAIRE CARRIED OUT" button
    Then I click on "CREATE FOLLOW-ON" button
    Then I navigate to "back"
    Then The Worklist page is open
    When I click at "first" WO
    Then WO page is "Shown"
    Then I choose "More Actions" button if WO is "In Progress"
    Then I click on "Create Follow-On Work Order" button
    When I click at "Add to backlog" option
    Then I click on "Found It, Fixed It" button
    Then I verify location field is populated
    Then I enter value in "Please Enter Description"
    When I click at "Select a Template" option
    Then I click on "377 Auxillaries" button
    Then I click on "NEXT" button
    Then I click at "Select Failure Class..." option
    Then I click on "377:DOORS" button
    Then I click at "Select Failure Problem..." option
    Then I click on "WATER LEAK" button
    Then I click at "Select Failure Cause..." option
    Then I click on "LOOSE" button
    Then I click at "Select Failure Remedy..." option
    Then I click on "REPAIRE CARRIED OUT" button
    Then I click on "CREATE FOLLOW-ON" button
    Then I navigate to "back"
    Then The Worklist page is open
    When I click at "first" WO
    Then WO page is "Shown"
    Then I choose "More Actions" button if WO is "In Progress"
    Then I click on "Create Follow-On Work Order" button
    When I click at "Add to backlog" option
    Then I click on "Assign to me" button
    Then I verify location field is populated
    Then I enter value in "Please Enter Description"
    When I click at "Select a Template" option
    Then I click on "377 Auxillaries" button
    Then I click on "NEXT" button
    Then I click at "Select Failure Class..." option
    Then I click on "377:DRA" button
    Then I click at "Select Failure Problem..." option
    Then I click on "FAULT INDICATION" button
    Then I click at "Select Failure Cause..." option
    Then I click on "LIFE EXPIRED" button
    Then I click at "Select Failure Remedy..." option
    Then I click on "REPLACED (LIKE FOR LIKE)" button
    Then I click on "CREATE FOLLOW-ON" button
    Then I navigate to "back"
    Then The Worklist page is open

    Examples:
      | country | EnvCode        | username        | password        |
      | Europe  | lucky-liger-8  | CBRUNS          | cbruns          |
