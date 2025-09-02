Feature: Login and check for notification

  Scenario Outline: Login and Logout
    Given I am on the Init page
    When I set Region select field
    When I set Region as US
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
    Then I navigate to "notifications"
    Then I click at "All" option
    Then I click on "Unread" button
    Then I click at "Unread" option
    Then I click on "Read" button 
    Then I click on "Mark All As Read" button
    Then I navigate to "back2"
    When I navigate to "back"
    Then I press the Hamburger icon
    Then I click on "Logout" button
    Then signIn option shows up

    Examples:
      | country | password   | username  | key   |
      | Europe  | lucky-liger-8 | CBRUNS | cbruns |
