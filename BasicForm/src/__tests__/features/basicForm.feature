Feature: Form

Background: 
    Given the user opens the app

Scenario: All inputs should be enabled
    Then all inputs should be enabled

Scenario: All buttons should be disabled
    Then all buttons should be disabled

# Scenario: All placeholders should be in capital 
#     Then all placeholders should be in capital

#Scenario: All inputs should be in white

# Scenario: Input error when leaving a section
#     Given the user selects the 'username' section
#     When the user deselects the 'name' section
#     Then the 'username' section should show an error
    

Scenario: Input error when leaving a section incompleted
    Given the user selects the 'username' section
    When the user selects the 'name' section
    Then the 'username' section should show an error

Scenario: User is unable to input a username longer than 10 character
    Given the user selects the 'username' section
    When the user types 'PEPELOQUETE'
    Then the 'username' section should show an error

Scenario: User is unable to input a username that includes name or surname
    Given the user completes the form with the next data
    """
    username: PEPE123
    name: PEPE
    surname: LOCO
    country: SPAIN
    id: 12345678S
    """
    Then the 'name' section should show an error

Scenario: Show list of countries
    Given the user selects the 'country' section
    Then the 'country' section should show a list 

Scenario: Id validation failed
    Given the user selects the 'country' section 
    And the user selects 'SPAIN'
    And the user selects the 'id' section
    When the user types '12345678SD'
    Then the 'id' section should show an error

# Scenario: Id validation failed
#     Given the user selects the 'country' section 
#     And the user selects "SPAIN"
#     And the user selects the "id" section
#     And the user types "12345678S"
#     Then the "id" section should show a confirmation

Scenario: Every inputted character must be in capital
    Given the user completes the form with the next data
    """
    username: pepe123
    name: pepito
    surname: LOCO
    country: SPAIN
    id: 12345678S
    """
    Then the app should warn the user 

Scenario: Succesful verification
    Given the user completes the form with the next data
    """
    username: PEP123
    name: PEPE
    surname: LOCO
    country: SPAIN
    id: 12345678S
    """
    Then the 'submit' button should be enabled

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


