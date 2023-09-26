Feature: Basic user data form:
        Form fuction
        ___
        Username [                ]( Max 10 characters )
        Name     [                ]
        Surname  [                ]
        Country  [ Select country ]
        ID       [                ]  Validate Spanish and Japanese ID
                [ Submit ] [ Clear ]
        Submit -> New page with a message.  If any info is not valid the button should be disabled.
        Clear -> Clears all text inputs and changes to deafult value of the list.
        ___
        -Any invalid will make the textbox to change the border color to "red" (field error)
        -Every character must be in capital letters
        -Name must not be included in Username
Background:
    Given the user opens the basic user data form

Scenario: All inputs should be enabled
    Then all inputs should be enabled

Scenario: Submit button should be disabled
    Then submit button should be disabled

Scenario: All placeholders should be in capital letters
    Then all placeholders should be in capital letters

Scenario: All inputs should be without error
    Then all inputs should be without error

Scenario Outline: Field error when leaving a textbox field empty
    Given the user clicks the "<field>" field
    When the user clicks out of the "<field>" field
    Then the "<field>" field should show the "Can't leave text input empty" error
    Examples:
        | field    |
        | username |
        | name     |
        | surname  |
        | id       |

Scenario: Field error when user inputs a username longer than 10 characters
    Given the user clicks the "username" field
    When the user types "PEPELOQUETE" inside the "username" field
    Then the "username" field should show the "Username can't surpass 10 characters" error

Scenario Outline: Field error when user erases all its previous input
    Given the user clicks the "<field>" field
    And the user types "<input>" inside the "<field>" field
    When the user earases all inputs inside the "<field>" field
    Then the "<field>" field should show the "<error>" error
    Examples:
        | field    | input     | error                   |
        | username | DA123     | Username can't be empty |
        | name     | DARIO     | Name can't be empty     |
        | surname  | RUA       | Surname can't be empty  |
        | id       | 121212    | Id can't be empty       |

Scenario Outline: Field error when user inputs lowercase characters
    Given the user clicks the "<field>" field
    When the user types "<input>" inside the "<field>" field
    Then the "<field>" field should show the "<error>" error
    Examples:
        | field    | input     | error                                       |
        | username | Dda123    | Username must be written in capital letters |
        | name     | Dario     | Name must be written in capital letters     | 
        | surname  | Rua       | Surname must be written in capital letters  |
        | id       | 121212d   | Id must be written in capital letters       |


# No need to chage the way you test if only is in use one field

Scenario Outline: Field error when user inputs name/surname included in username
    Given the user clicks the "<field>" field
    And the user types "<input>" inside the "<field>" field
    When the user types "<input2>" inside the "<field2>" field
    Then the "<field2>" field should show the "<error>" error
    Examples:
        | field    | input     | field2    | input2     | error                          |
        | username | DARIO123  | name      | DARIO      | Name must not be in username    |
        | username | RUA123    | surname   | RUA        | Surname must not be in username |
        | name     | DARIO     | username  | DARIO123   | Username can't contain name    |
        | surname  | RUA       | username  | RUA123     | Username can't contain surname |

# Scenario Outline: Id validation failed according to the selected country 
#     Given the user clicks the "<field>" field
#     And the user selects "<option>" option inside the list
#     When the user types "<input>" inside the "<field2>" field
#     Then the "<field2>" field should show an error
#     Examples:
#         | field    | option    | field2    | input      |
#         | country  | SPAIN     | id        | D12121212  |
#         | country  | JAPAN     | id        | 12121212   |

Scenario Outline: Id validation failed according to the selected country 
    Given the user clicks the "country" field
    And the user selects "<option>" option inside the list
    When the user types "<input>" inside the "id" field
    Then the "id" field should show the "ID format error" error
    Examples:
        | option    | input      |
        | SPAIN     | D12121212  |
        | JAPAN     | 12121212   |

# ES id has to have 9 characters, the first 8 being numbers and the last one a letter
# JP id has to have 12 characters all being numbers

# Scenario Outline: Submit button enabled - form completed and all data is valid
#     Given the user types "<input>" inside the "<field>" field
#     And the user types "<input2>" inside the "<field2>" field
#     And the user types "<input3>" inside the "<field3>" field
#     And the user selects "<option>" option inside the list
#     And the user types "<input4>" inside the "<field4>" field
#     Then the "submit" button should be enabled
#     Examples:
#         | input  | field    | input2  | field2 | input3 | field3  | option | input4       | field4 |
#         | DR123  | username | DARIO   | name   | RUA    | surname | SPAIN  | 12345678D    | id     |
#         | RD321  | username | MARK    | name   | EVANS  | surname | JAPAN  | 123456789012 | id     |


Scenario Outline: Submit button enabled - form completed and all data is valid
    Given the user types "<input>" inside the "username" field
    And the user types "<input2>" inside the "name" field
    And the user types "<input3>" inside the "surname" field
    And the user selects "<option>" option inside the list
    And the user types "<input4>" inside the "id" field
    Then the "submit" button should be enabled
    Examples:
        | input  | input2  | input3 | option | input4       |
        | DR123  | DARIO   | RUA    | SPAIN  | 12345678D    |
        | RD321  | MARK    | EVANS  | JAPAN  | 123456789012 |

# Scenario: Succesful verification
#     Given the user completes the form with the next data
#     """
#     username: PEP123
#     name: PEPE
#     surname: LOCO
#     country: SPAIN
#     id: 12345678S
#     """
#     When the users presses the 'submit' button
#     Then the app should validate the user
Scenario Outline: Form submition - form completed and all data is valid
    Given the user types "<input>" inside the "username" field
    And the user types "<input2>" inside the "name" field
    And the user types "<input3>" inside the "surname" field
    And the user selects "<option>" option inside the list
    And the user types "<input4>" inside the "id" field
    When the user presses the "submit" button
    Then the form should be "validated"
    Examples:
        | input  | input2  | input3 | option | input4       |
        | DR123  | DARIO   | RUA    | SPAIN  | 12345678D    |
        | RD321  | MARK    | EVANS  | JAPAN  | 123456789012 |

Scenario Outline: Clear button - form is cleared
    Given the user types "<input>" inside the "username" field
    And the user types "<input2>" inside the "name" field
    And the user types "<input3>" inside the "surname" field
    And the user selects "<option>" option inside the list
    And the user types "<input4>" inside the "id" field
    And the user presses the "clear" button
    Then the form should be "cleared"
    Examples:
        | input  | input2  | input3 | option | input4       |
        | DR123  | DARIO   | RUA    | SPAIN  | 12345678D    |
        | RD321  | MARK    | EVANS  | JAPAN  | 123456789012 |
        | ADADA  | LOL     | MALO   | SPAIN  | 1234D12      |
        | 34344  | JUL     | TORR   | JAPAN  | 1234DADAD    |

