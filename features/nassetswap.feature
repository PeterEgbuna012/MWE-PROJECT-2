# Need to create asset swap WO
Feature: Asset Swap

  Scenario Outline: Asset Swap
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
    #Then WO page is "Shown"
    Then I click at button next to "Ready"
    Then I click on "START WORK" button
    Then The status of the work Order is in "In Progress"
    Then I navigate "Work" tab
    When "MATERIALS" widget is clicked
    Then I click on "Search All Parts" button
    Then I enter material from data file in textfield "Search by Part Code or Description"
    When I click on "Material" button
    When I click on "ADD TO LIST" button
    When I click on "SEARCH" button
    When I click on "" button
    When I click on "CONFIRM" button
    # click on close button "" after confirm
    #When I click on "" button
    #click on back button "" on inventory page thrice
    When I click on "" button
    When I click on "" button
    When I click on "" button
    When I navigate to "back"
    When I navigate to "back"
    Then The Worklist page is open
    When I click at "first" WO
    Then I navigate "Work" tab
    When "MATERIALS" widget is clicked
    When I click on "GO TO ASSET SWAP" button
    When I press the "Tap to select Outbound Asset" button
    When I click on "Select" button
    When I press the "Tap to select Inbound Asset" button
    When I click on "Select" button
    When I tap location select button
    When I click on "Location" button
    When I click on "CONFIRM" button
    #When I click on "SWAP" button for below
    When I click on " Search All Parts" button
    Then I compare the "1" values
    Then I navigate to "back"
    Then I navigate to "back"
    Then The Worklist page is open
   

   Examples:
      | country | EnvCode        | username        | password        |
      | Europe  | lucky-liger-8  | CBRUNS          | cbruns          |
