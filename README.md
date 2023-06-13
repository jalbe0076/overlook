# Overlook

## Table of Contents

* [Technologies Used](#Technologies-Used)
* [Abstract](##Abstract)
* [Installation Instructions](#Installation-Instructions)
* [Preview of App](#Preview-of-App)
* [Context](#Context)
* [Contributors](#Contributors)
* [Learning Goals](#Learning-Goals)
* [Wins + Challenges](#Wins-+-Challenges)

## Technologies Used

- JavaScript
- SASS
- HTML5
- Mocha / Chai (TDD)
- Webpack
- Fetch API

## Abstract:
[//]: <> (Briefly describe what you built and its features. What problem is the app solving? How does this application solve that problem?)

A hotel dashboard system allows customers to log in and plan their next stay. Users can log in using different usernames and view different information such as the number of nights stayed in the past, total amount spent to date, and past and future bookings. User can also book their next stay, the system will check the date selected by the user to see what bookings have already been booked for that day, and it will then display the available rooms.

## Installation Instructions:
[//]: <> (What steps does a person have to take to get your app cloned down and running?)

1. Fork this repository https://github.com/jalbe0076/overlook 
1. Clone down your new, forked repo using the generated SSH link in the terminal
1. cd into the repository and run `npm install` to install dependencies
1. cd .. to get out of the directory
1. clone down the local server and follow the steps listed in the link to get it installed https://github.com/turingschool-examples/overlook-api 
1. run `npm start`in both directories and go to `http://localhost:8080/`, you should see a login page
1. Enter the username and password to visit the site => Username: customer50 Password: overlook2021

## Preview of App:
[//]: <> (Provide ONE gif or screenshot of your application - choose the "coolest" piece of functionality to show off.)

*Allows a user to log in and log out*
![Login Preview](src/images/login-overlook.gif)

*Overview of features*
![Login Preview](src/images/user-42-screenshot.gif)

*Overview of features using another user*
![Login Preview](src/images/user-43-screeenshot.gif)

## Context:
[//]: <> (Give some context for the project here. How long did you have to work on it? How far into the Turing program are you?)

We were assigned the project on 2023.06.12 and had until 2023.06.13 to complete the project. The required features were completed on 2023.06.11 and refactoring and introducing additional features and technologies were completed before the due date. This is the Turing Mod 2 final solo project issued with the intent to implement everything that was thought since the beginning of the program. We were tasked to build a hotel dashboard system from scratch and fetch data from a local server. 

## Contributors:
[//]: <> (Who worked on this application? Link to their GitHubs.)

[Jason Alberto](https://github.com/jalbe0076)

## Learning Goals:
[//]: <> (What were the learning goals of this project? What tech did you work with?)

- Use object and array prototype methods to perform data manipulation
- Create a clear and accessible user interface
- Make network requests to retrieve data
- Implement a robust testing suite using TDD
- Write DRY, reusable code that follows SRP (Single Responsibility Principle)
- Ensure the site is accessible for as many users as possible using multiple inputs (ie: keyboard)

## Wins + Challenges:
[//]: <> (What are 2-3 wins you have from this project? What were some challenges you faced - and how did you get over them?)

**Win #1** Made the user experience when navigatings with the keyboard more pleasant by ensuring focus on specific elements when clicking and adding tab traps to ensure the focused element remains where input is required. <br>
**Win #2** Getting SASS setup and using it to write the CSS, learned how to manipulate the package.json to watch for any changes not requiring to save the file as code is written. <br>
**Win #3** Wrote a function to handle fetch requests that do not have an ok status and alert the user what the error is. 

