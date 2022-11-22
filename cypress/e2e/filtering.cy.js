import { filterByGender, filterByTitle } from "../support/e2e";

let peoples; // List of Discover movies from TMDB

describe("Filtering", () => {
  before(() => {
    // Get movies from TMDB and store them locally.
    cy.request(
        `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&page==1`
        
      )
        .its("body")
        .then((response) => {
          peoples = response.results;
        });
  });
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  describe("By people name", () => {
    it("only display peoples with 'a' in the title", () => {
      cy.get("button").contains("People").click();
      cy.url().should("include", `/popular`);
      const searchString = "b";
      const matchingPeoples = filterByTitle(peoples, searchString);
      cy.get("#filled-search").clear().type(searchString); // Enter m in text box
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingPeoples.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingPeoples[index].name);
      });
    });
    it("handles case when there are no matches", () => {
        const searchString = "xyxxzyyzz";
        cy.get("#filled-search").clear().type(searchString); // Enter m in text box
        cy.get(".MuiCardHeader-content").should("have.length", 0);
      });
  });
  describe("By people gender", () => {
    it("show peoples with the selected gender", () => {
      cy.get("button").contains("People").click();
      cy.url().should("include", `/popular`);
      const selectedGenderId = 2;
      const selectedGenderText = "Male";
      const matchingPeoples = filterByGender(peoples, selectedGenderId);
      cy.get("#genre-select").click();
      cy.get("li").contains(selectedGenderText).click();
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingPeoples.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingPeoples[index].name);
      });
    });
  });

  describe("Combined name and gender", () => {
    it("show peoples with the combination of selected name and gender", () => {
        cy.get("button").contains("People").click();
        cy.url().should("include", `/popular`);
        const searchString = "a";
        const selectedGenderId = 2;
        const selectedGenderText = "Male";
        const matchingPeoples = filterByGender(filterByTitle(peoples, searchString), selectedGenderId);
        cy.get("#filled-search").clear().type(searchString); // Enter m in text box
        cy.get("#genre-select").click();
        cy.get("li").contains(selectedGenderText).click();
        cy.get(".MuiCardHeader-content").should(
            "have.length",
            matchingPeoples.length
        );
        cy.get(".MuiCardHeader-content").each(($card, index) => {
          cy.wrap($card).find("p").contains(matchingPeoples[index].name);
        });
      });
  });

});