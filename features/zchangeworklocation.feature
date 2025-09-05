Feature: Change Work Location

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
    Then I navigate "DETAILS TAB" tab
    # this icon is for Location
    Then I press the "LOCATION EDIT" button
     When I click the location search field
    And I enter "Rolling Stock" in the location search field
    And I select the location result with name "Rolling Stock"
    Then the location should be selected successfully
    Then I click on "CONFIRM" button
    Then I navigate to "back"
    Then The Worklist page is open
    When I click at "first" WO
   Then I take a screenshot 

    Examples:
      | country | EnvCode        | username        | password        |
      | Europe  | lucky-liger-8  | CBRUNS          | cbruns          |
