// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('logIn', (username, password) => {
    cy.get(".MuiCardHeader-root").eq(1).find("svg").should("not.exist");
    cy.get("button[aria-label='add to favorites']").eq(1).click();
    cy.get(".MuiCardHeader-root").eq(1).find("svg");
    cy.get("#Link-to-favorite").click();
    cy.url().should("include", `/movies/favorites`);
    cy.get("#outlined-required").clear().type(username);
    cy.get("#outlined-multiline-static").clear().type(password);
    cy.get("button").contains("Log In").click();
});

Cypress.Commands.add('logInViaMobile', (username, password) => {
    cy.get("header").find("button").click();
    cy.get("#Link-to-favorite").click();
    cy.url().should("include", `/movies/favorites`);
    cy.get("#outlined-required").type(username, { force: true });
    cy.get("#outlined-multiline-static").clear({ force: true }).type(password, { force: true });
    cy.get("button").contains("Log In").click({ force: true });
    cy.url().should("include", `/movies/favorites`);

});