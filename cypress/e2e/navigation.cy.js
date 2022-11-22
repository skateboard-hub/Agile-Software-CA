let movies;
let movieId; // Enola Holmes movie id
let peoples;

describe("Navigation", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
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
    cy.visit("/");
  });
  describe("From the home page to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${movies[0].id}`);
    });
  });

  describe("The site header", () => {
    describe("when the viewport is desktop scale", () => {
      it("TopRated via the links", () => {
        cy.get("button").contains("TopRated").click();
        cy.url().should("include", `/topRated`);
        cy.get("button").contains("Home").click();
        cy.url().should("include", `/`);
      });
      it("People via the links", () => {
        cy.get("button").contains("People").click();
        cy.url().should("include", `/popular`);
        cy.get("button").contains("Home").click();
        cy.url().should("include", `/`);
      });
    });
    describe(
      "when the viewport is a mobile scale",
      {
        viewportHeight: 896,
        viewportWidth: 414,
      },
      () => {
        it("TopRated via the dropdown menu", () => {
          cy.get("header").find("button").click();
          cy.get("li").contains('TopRated').click();
          cy.url().should("include", `/topRated`);
          cy.get("li").contains('Home').click();
          cy.url().should("include", `/`);
        });
        it("People via the dropdown menu", () => {
          cy.get("header").find("button").click();
          cy.get("li").contains('People').click();
          cy.url().should("include", `/popular`);
          cy.get("li").contains('Home').click();
          cy.url().should("include", `/`);
        });
      }
    );
    
  });

  describe("From the home page to a person's details", () => {
    it("navigates to the people details page with parameterised URL", () => {
      cy.get("button").contains("People").click();
      cy.url().should("include", `/popular`);
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/peoples/${peoples[0].id}`);
    });
  }); 
});


