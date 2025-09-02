Feature: Processing assigned task

  Scenario Outline: Processing Task
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
    Then I click at button next to "On Hold"
    Then I click on "START WORK" button
    Then The status of the work Order is in "In Progress"
    Then I navigate "Work" tab
    When I press "task" widget
    When I tap on task with number "10."
    Then "10" page appears
    #Then I click on "Add Signature" button
    # this symbol is for circle button in task
    Then I click on "" button
    When I click on "SIGN & COMPLETE" button
    Then "TASK IS COMPLETED" button is displayed
    #it means close button
   # Then I press the "" button   
    Then I navigate to "done"
    When I tap on task with number "20."
    Then "20" page appears
   # Then I click on "Add Signature" button
   # this symbol is for circle button in task
    Then I click on "" button
    When I click on "SIGN & COMPLETE" button
    Then I enter text "TASK IS COMPLETED" in comments textbox
    Then I click on "OK" button

    Examples:
      | country | EnvCode  | username  | password   |
      | Europe  | lucky-liger-8 | CBRUNS | cbruns |
