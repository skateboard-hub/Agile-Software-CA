let knownFor;
let peoples;

describe("Hyperlinking", () => {
  before(() => {
      cy.request(
        `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&page==1`
        
      )
        .its("body")
        .then((response) => {
          peoples = response.results;
          knownFor = peoples[0].known_for
        });
        
  });
  beforeEach(() => {
    cy.visit("/");
  });

  describe("From the home page to a movie via a people's detail page", () => {
    it("navigates to the people details page with parameterised URL", () => {
      cy.get("button").contains("People").click();
      cy.url().should("include", `/popular`);
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/peoples/${peoples[0].id}`);
    });
    it("the movie for which person is famous for", () => {
      cy.get("button").contains("People").click();
      cy.url().should("include", `/popular`);
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/peoples/${peoples[0].id}`);
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${knownFor[0].id}`);
    });
  }); 
});

