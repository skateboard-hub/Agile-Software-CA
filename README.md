# Assignment 1 - Agile Software Practice.

__Name:__ Shunyi Xu

This repository contains the implementation of a React App and its associated Cypress tests and GitLab CI pipeline.

## React App Features.

[ Provide a bullet-point list of the __new features__ you added to the Movies Fan app (and any modifications to existing features).]
 
+ Three new views
+ Multiple Parameterised URLs
+ Three parameterised endpoints
+ New filter based on the gender of people
+ Extensive data hyperlinking
+ Simple responsive authentication
+ New material UI components
+ Responsive UI
+ Pagination
+ SlideShow

## Automated Tests.

+ filtering - filter the people by the name, gender and the combination of both
+ hyperlinking - test if the app get the three films cards which the people is famous for and click the "More Information" button 
+ LogIn - test simple authentication, and responsive UI, using Cypress Custom commands and do Error/Exception testing.
+ navigation - test three new views, including top rated movie page, people page, people's detail page and parameterrised endpoints through navigation
+ pagination - test the pagination by the mui material UI and multiple arameterised URLs, comparing the data requested with the result in the page
+ review
### Best test cases.

+ cypress/e2e/LogIn.cy.js
+ cypress/e2e/filtering.cy.js

### Cypress Custom commands (if relevant).


+ cypress/e2e/LogIn.cy.js

## Code Splitting.

+ src/index.js

## Pull Requests.

https://github.com/skateboard-hub/Agile-Software-CA/pulls?q=is%3Apr+is%3Aclosed

## Independent learning (If relevant).

Auto-deployment:
I make the Auto-deployment with respect to the github, I pulish the website to 'https://skateboard-hub.github.io/' by the branch gh-pages

refernce:https://create-react-app.dev/docs/deployment/#step-3-deploy-the-site-by-running-npm-run-deploy

## Github.

https://github.com/skateboard-hub/Agile-Software-CA.git

## Gitlab.

https://gitlab.com/skateboard-hub/agile-software-ca.git
