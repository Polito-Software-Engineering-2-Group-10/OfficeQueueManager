TEMPLATE FOR RETROSPECTIVE (Team 10)
=====================================

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
  1. Receive ticket: 3 points
  2. Get estimated time: 3 points
  3. Serve next client: 2 points

  We committed to 3 stories and finished 3 stories.
- Total points committed vs. done: we committed 8 story points and done 8 story points.
- Nr of hours planned vs. spent (as a team) planned: we planned 55 hours total with the sum of the estimatons of the stories and we spent 58 hours and 39 minutes approximately.

**Remember**a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story        | # Tasks                                                   | Points | Hours est. | Hours actual |
|--------------|-----------------------------------------------------------|--------|------------|--------------|
| _#0_         | Finish the sprint planning                                |    -   |   10h30m   |    10h30m    |
| _#0_         | Download and setup Postgres                               |    -   |     7h     |      7h      |
| _#0_         | Github peer-to-peer teaching                              |    -   |    3h30m   |     3h30m    |
| _#1 #2 #3_   | Design the database                                       |    8   |     2h     |      2h      |
| _#1 #2 #3_   | Implement and initialize the Database                     |    8   |     2h     |      2h      |
| _#1 #2 #3_   | Review the database implementation                        |    8   |     1h     |      1h      |              
| _#3_         | Implement the frontend interface for the officer          |    2   |     4h     |    10h30m    |
| _#1 #2 #3_   | Test frontend for customer and officer                    |    8   |     1h     |      1h      |
| _#1 #2_      | Implement fronted interface for customer                  |    6   |     4h     |      1h      |
| _#1 #2 #3_   | Write documentation for frontend                          |    8   |     2h     |     1h30m    |
| _#1 #2 #3_   | Review backend implementation                             |    8   |     2h     |      1h      |
| _#3_         | Design the frontend interface for the officer             |    2   |     2h     |      2h      |
| _#1 #2 #3_   | Review frontend                                           |    8   |     2h     |      1h      |
| _#1 #2 #3_   | Test the backend                                          |    8   |     2h     |      2h      |
| _#1 #2_      | Design the frontend interface for the customer            |    6   |     2h     |     1h30m    |
| _#1 #2 #3_   | Write the API to connect the backend and the database     |    8   |     2h     |      2h      |
| _#1 #2 #3_   | Write the documentation for the backend                   |    8   |     2h     |      2h      |
| _#1 #2 #3_   | Implement the backend                                     |    8   |     4h     |      7h      |


> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual): 
  - Average: estimate: 55 / 18 = **2h16m**, actual: 58h39m / 18 = **3h06m**, 
  - Standard eviation estimate: **3h06m**, Standard eviation actual: **2h16m**
- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1:
  - 55/58.5 - 1 = 0,94017094 - 1 = **−0,05982906** 

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 2h
  - Total hours spent: 2h
  - Nr of automated unit test cases: 14 
  - Coverage (if available): 65%
- E2E testing:
  - Total hours estimated: 1h
  - Total hours spent: 1h
- Code review 
  - Total hours estimated: 2h + 1h + 2h = 5h
  - Total hours spent: 1h05m + 1h + 1h = 3h05m
  


## ASSESSMENT

- What caused your errors in estimation (if any)?

   The sprint planning took a lot more time it should have, mostly because this was our first time doing it and we needed to get familiar with the tools, and how to split stories into tasks and divide them nicely between team members.
   
   Getting familiar with the new tools we have to use for this workshop caused us to lose some hours, especially in the beginning.
   
   Also understanding the code written by others to implement and finish features started by other team members took a bit of extra time than expected, mostly because you have to get familiar with different styles, this will be easier in the future.
- What lessons did you learn (both positive and negative) in this sprint?

  **Positive**
  - The positive aspect of this sprint we think is that we have learnt how to manage our hours, to see in every moment how much time we spend on a task is very useful, made us more focused on the work we have to do and where to concentrate the hours we had to put in this sprint.
  - When joining a new team, how to be familiar with new team members and how to collaborate.
  - Consider how much familiar you are with a technology before using it for a correct estimation.
  - Understand the importance of coordination and communication for a team in order to work efficiently together.

  **Negative**
  - Considering that we have to work in "separate department", for getting a task done the previous work has to be done, so coordinating between the teams member is very important.
  - The fact that if there is a problem that makes a task take more time than estimated or be moved to a different date, this will cause a cascade effect on all other tasks after it.

- Which improvement goals set in the previous retrospective were you able to achieve?

  - N/A (there were no retrospectives before this one)
  
- Which ones you were not able to achieve? Why?

  - N/A (there were no retrospectives before this one, thus no goals)

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  - Improve the coordination and comunication between teammates.

    Solution: keep each other updated constantly, using the tools we have, like Telegram messages and/or scrum meetings.

  - Managing better the hours assigned to each one of us.

    Solution: understand better the limits of each one of us, and how much time we need to complete a task.

- One thing you are proud of as a Team!!
  - We are proud that everyone worked correctly and nicely, all of us worked on what was assigned.
  - We are proud also to have completed all the stories that we have planned to do.