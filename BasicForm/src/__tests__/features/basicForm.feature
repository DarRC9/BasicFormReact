Feature: Form

Background: 
    Given the user opens the app

Scenario: All inputs should be enabled
    Then all inputs should be enabled

Scenario: All buttons should be disabled
    Then all buttons should be disabled

Scenario: All placeholders should be in capital 
    Then all placeholders should be in capital

Scenario: All inputs should be without error
    Then all inputs should be without error

Scenario: Input error when leaving username section empty
    Given the user selects the 'username' section
    When the user deselects the 'username' section
    Then the 'username' section should show an error

Scenario: Input error when leaving name section empty
    Given the user selects the 'name' section
    When the user deselects the 'name' section
    Then the 'name' section should show an error

Scenario: Input error when leaving surname section empty
    Given the user selects the 'surname' section
    When the user deselects the 'surname' section
    Then the 'surname' section should show an error

Scenario: Input error when leaving id section empty
    Given the user selects the 'id' section
    When the user deselects the 'id' section
    Then the 'id' section should show an error

Scenario: User is unable to input a username longer than 10 character
    Given the user selects the 'username' section
    When the user types 'PEPELOQUETE'
    Then the 'username' section should show an error

Scenario: User types and then remove input from username
    Given the user selects the 'username' section
    And the user types 'PEPE123'
    When the user deletes his input
    Then the 'username' section should show an error

Scenario: User types and then remove input from name
    Given the user selects the 'name' section
    And the user types 'PEPE'
    When the user deletes his input
    Then the 'name' section should show an error

Scenario: User types and then remove input from surname
    Given the user selects the 'surname' section
    And the user types 'LOPEZ'
    When the user deletes his input
    Then the 'surname' section should show an error

Scenario: User is unable to input lowercase username
    Given the user completes the form with the next data
    """
    username: p123
    name: PEPE
    surname: LOCO
    country: SPAIN
    id: 12345678S
    """
    Then the 'username' section should show an error

Scenario: Every inputted character in username must be uppercase
    Given the user completes the form with the next data
    """
    username: pepe123
    name: PEPITO
    surname: LOCO
    country: SPAIN
    id: 12345678S
    """
    Then the 'username' section should show an error
    # Then the app should warn the user 
    
Scenario: Every inputted character in name must be uppercase
    Given the user completes the form with the next data
    """
    username: PEP123
    name: pepito
    surname: LOCO
    country: SPAIN
    id: 12345678S
    """
    Then the 'name' section should show an error

Scenario: Every inputted character in surname must be uppercase
    Given the user completes the form with the next data
    """
    username: PEP123
    name: PEPITO
    surname: guzman
    country: SPAIN
    id: 12345678S
    """
    Then the 'surname' section should show an error

Scenario: User is unable to input a username that includes name
    Given the user completes the form with the next data
    """
    username: PEPE123
    name: PEPE
    surname: LOCO
    country: SPAIN
    id: 12345678S
    """
    Then the 'name' section should show an error

Scenario: User is unable to input a username that includes surname
    Given the user completes the form with the next data
    """
    username: PEPE123
    name: LOCO
    surname: PEPE
    country: SPAIN
    id: 12345678S
    """
    Then the 'surname' section should show an error

Scenario: Show list of countries
    Given the user selects the 'country' section
    Then the 'country' section should show a list 

Scenario: Spanish id validation failed
    Given the user selects the 'country' section 
    And the user selects 'SPAIN'
    And the user selects the 'id' section
    When the user types '12345678SD'
    Then the 'id' section should show an error
#id has to have 9 characters, the first 8 being numbers and the last one a letter

Scenario: Japanese id validation failed
    Given the user selects the 'country' section 
    And the user selects 'JAPAN'
    And the user selects the 'id' section
    When the user types '1234567890' 
    Then the 'id' section should show an error
#id has to have 12 characters all being numbers
Scenario: Valid data
    Given the user completes the form with the next data
    """
    username: PEP123
    name: PEPE
    surname: LOCO
    country: JAPAN
    id: 123456789012
    """
    Then the submit button should be enabled

Scenario: Succesful verification
    Given the user completes the form with the next data
    """
    username: PEP123
    name: PEPE
    surname: LOCO
    country: SPAIN
    id: 12345678S
    """
    When the users presses the 'submit' button
    Then the app should validate the user


