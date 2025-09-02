Feature: Clear Local Data to ensure all data is up-to-date
@ignore
  Scenario Outline: Version, Environment and Licenses
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
    Then I press the Hamburger icon
    Then I click on "Clear Local Data" button
    Then I click on "OK" button
    When I switch to the web view context
    Then I enter username as "<username>"
    And I enter password as "<password>"
    And I click on "Sign In" button
    And I switch to native view context
    And I see allow button
    When I click on "Reject" button
    Then The Worklist page is open
    
    Examples:
      | country | EnvCode        | username        | password   |
      | Europe  | lucky-liger-8  | CBRUNS          | cbruns     |
