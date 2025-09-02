Feature: Complete a CM Followon WO

  Scenario Outline: Complete WO
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
    Then I click at button next to "Ready"
     Then I click on "START WORK" button
    Then The status of the work Order is in "In Progress"
    # Then I navigate "Work" tab
    # Then I navigate "Details" tab
    #Then I choose "More Actions" button if WO is "In Progress"
    #Then I click on "Add Comment" button
    #Then I click at "Select type..." option
    #Then I click on "FAULTLOG" button
    #Then I enter value in "Enter summary..."
    #Then I enter value in "Enter details..."
    #Then I click on "ADD COMMENT" button
    #Then I navigate to "back"
    #Then The Worklist page is open
    #When I click at "first" WO
    Then I navigate "Work" tab
    Then "FAILURE INFORMATION" widget is clicked
    Then I click on "SAVE FAILURE CODES" button
    Then I navigate to "back"
    Then The Worklist page is open
    When I click at "first" WO
    #Then WO page is "Shown"
    Then I click at button next to "In Progress"
    When I click on "Complete" button
    Then I click on "COMPLETE WORK ORDER" button
    Then I navigate to "back"
    Then WO page is "Not Shown"

    Examples:
      | country | EnvCode        | username        | password        |
      | Europe  | lucky-liger-8  | CBRUNS          | cbruns          |
