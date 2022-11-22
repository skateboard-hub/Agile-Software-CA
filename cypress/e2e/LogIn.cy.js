let movies;
describe("logIn", () => {
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
    })
  beforeEach(() => {
    cy.visit("/");
  });
describe("The loging In Page", () => {
    describe("when input right username and password", () => {
      it("loging in via the links", () => {
        const username = "a";
        const password = "b";
        cy.logIn(username,password);
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          1
        );
      });
    });
    describe("when input wrong username", () => {
      it("loging in via the links", () => {
        const username = "wrong";
        const password = "b";
        cy.logIn(username,password);
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          0
        );
      });
    });
    describe("when input wrong password", () => {
      it("loging in via the links", () => {
        const username = "a";
        const password = "wrong";
        cy.logIn(username,password);
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          0
        );
      });
    });
    describe(
      "when the viewport is a mobile scale",
      {
        viewportHeight: 896,
        viewportWidth: 414,
      },
      () => {
        it("loging in via the dropdown menu", () => {
          cy.get("header").find("button").click();
          cy.get("#Link-to-favorite").click();
          cy.url().should("include", `/movies/favorites`);
          const username = "a";
          const password = "b";
          cy.get("#outlined-required").type(username, {force: true});
          cy.get("#outlined-multiline-static").clear({force: true}).type(password, {force: true});
          cy.get("button").contains("Log In").click({force: true});
          cy.url().should("include", `/movies/favorites`);
        });
      }
      
    );
    describe(
      "when the viewport is a mobile scale",
    {
      viewportHeight: 896,
      viewportWidth: 414,
    }, () => {
      it("when input wrong username", () => {
        const username = "wrong";
        const password = "b";
        cy.logInViaMobile(username,password);
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          0
        );
      });
    });
    describe(
      "when the viewport is a mobile scale",
    {
      viewportHeight: 896,
      viewportWidth: 414,
    }, () => {
      it("when input wrong password", () => {
        const username = "a";
        const password = "wrong";
        cy.logInViaMobile(username,password);
        cy.get(".MuiCardHeader-content").should(
          "have.length",
          0
        );
      });
    });

  });
});