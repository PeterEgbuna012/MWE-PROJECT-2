Feature: Complete a CM WO

  Scenario Outline: Complete WO
    Given I am on the Init page
    When I set Region select field
    When I set Region as Europe
    When I set "<password>" into Environment Code input field
    Then I can connect to the Environment
    Then signIn option shows up
    When I switch to the web view context
    Then I enter username as "<username>"
    And I enter password as "<key>"
    And I click on "Sign In" button
    And I switch to native view context
    And I see allow button
    When I click on "Reject" button
    Then The Worklist page is open
    When I click at "first" WO
    Then WO page is "Shown"
    Then I choose "More Actions" button if WO is "In Progress"
    Then I click on "Add Comment" button
    Then I click at "Select type..." option
    Then I click on "FAULTLOG" button
    Then I enter value in "Enter summary..."
    Then I enter value in "Enter details..."
    Then I click on "ADD COMMENT" button
    Then I navigate to "back"
    Then The Worklist page is open
    When I click at "first" WO
    Then I navigate "Work" tab
    Then "FAILURE INFORMATION" widget is clicked
    Then I click at "Select Failure Class..." option
    Then I click on "377:Auxillaries" button
    Then I click at "Select Failure Problem..." option
    Then I click on "CRACKED" button
    Then I click at "Select Failure Cause..." option
    Then I click on "BURNT" button
    Then I click at "Select Failure Remedy..." option
    Then I click on "REPAIRE CARRIED OUT" button
    Then I click on "SAVE FAILURE CODES" button
    Then I navigate to "back"
    Then The Worklist page is open
    When I click at "first" WO
    #Then WO page is "Shown"
    Then I click at button next to "In Progress"
    When I click on "Complete" button
    When I click at "Select outcome..." option
    Then I click on "Permanent Fix" button
    Then I click on "COMPLETE WORK ORDER" button
    Then I navigate to "back"
    Then WO page is "Not Shown"

    Examples:
      | country | password   | username  | key    |
      | Europe  | lucky-liger-8 | CBRUNS | cbruns |
