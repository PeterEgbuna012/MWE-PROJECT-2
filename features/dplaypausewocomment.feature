# This feature file covers Play and Pause the Work Order along with adding comments.
Feature: Play and Pause the Work Order and add comments

  Scenario Outline: Try to Connect to Environment with valid Environment Code
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
   Then The status of the work Order is in "In Progress"
   When I navigate to "back"
    Then The Worklist page is open
    When I click at "second" WO
    Then I click on "RETURN ICON" button
    Then WO page is "Shown"
    Then I navigate to "back"
    Then The Worklist page is open
    When I click at "first" WO
    Then I click on "PAUSE ICON" button
   # Then I click at button next to "In Progress"
    When I click on "PAUSE" button
   # When I select "Start" date field
   # Then I set date as "yesterdays" date
   # Then I click on "Done" button
  #  When I select "End" date field
   # Then I set date as "todays" date
   # Then I click on "Done" button
   # When I click at "Select outcome..." option
   # Then I click on "On Hold" button
    Then I click on "PAUSE WORK ORDER" button
    Then I navigate to "back"
    Then The Worklist page is open
    When I click at "first" WO
    Then WO page is "Shown"
    Then I click on "START ICON" button
    Then I click on "START WORK" button
    Then I choose "More Actions" button if WO is "In Progress"
    Then I click on "Add Comment" button
    Then I click at "Select type..." option
    Then I click on "UPDATE" button
    Then I enter value in "Enter summary..."
    Then I enter value in "Enter details..."
    Then I click on "ADD COMMENT" button
    Then I click at button next to "In Progress"

    Examples:
      | country | EnvCode        | username       | password   |
      | Europe  | lucky-liger-8  | AGRAY          | maximo     |
