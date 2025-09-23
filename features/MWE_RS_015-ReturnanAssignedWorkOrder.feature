Feature: MWE_RS_015 - Return an Assigned Work Order

  Scenario Outline: Return an Assigned Work Order
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
    Then I click on "PAUSE ICON" button
    Then I click on "RETURN" button
    When I select "Start" date field
    Then I set date as "yesterdays" date
    Then I click on "DONE" button
    When I select "End" date field
    Then I set date as "todays" date
    Then I click on "DONE" button
    Then I enter "TEST" in textfield "Please enter a reason for returning the work..."
    #Then The status of the work Order is in "On Hold"

    Examples:
      | country | EnvCode        | username        | password        |
      | Europe  | lucky-liger-8  | CBRUNS          | cbruns          |
