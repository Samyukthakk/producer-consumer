# Producer-Consumer application

This is a producer-consumer application, where the left hand side of the application acts as the producer and the right hand side of the application acts as the consumer.
The consumer consumes the messages sent by the producer and persists/saves it in the localstorage. The user can also delete the saved messages if needed.

Goal of this application is to enter and store name and phone numbers in a list.
1. A form with 2 fields – first name and phone number. (Producer)
  * Validations:
    * First name should be at least 2 characters.
    * Phone numbers are valid phone numbers (10 numbers, numbers only)

2. A list to display all the messages sent from the producers. (Consumer)
   * Each message contains first name and phone number.