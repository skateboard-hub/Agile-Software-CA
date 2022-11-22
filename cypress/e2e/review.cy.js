let movies;
let movie;
let reviews;

describe("Get Reviews", () => {
    before(() => {
        // Get the discover movies from TMDB and store them locally.
        cy.request(
          `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
            "TMDB_KEY"
          )}&language=en-US&include_adult=false&include_video=false&page=1`
        )
          .its("body") // Take the body of HTTP response from TMDB
          .then((response) => {
            movies = response.results;
          });
      });
    
  describe("Review", () => {
    before(() => {
        cy.request(
        `https://api.themoviedb.org/3/movie/${
            movies[0].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
        )
        .its("body")
        .then((movieDetails) => {
            movie = movieDetails;
        });
        cy.request(
            `https://api.themoviedb.org/3/movie/${movies[0].id}/reviews?api_key=${Cypress.env("TMDB_KEY")}`
            )
            .its("body")
            .then((response) => {
                reviews = response.results;
            });
        
      });
    it("Display the movie reviews", () => {
        cy.visit(`/movies/${movies[0].id}`)
        cy.get(".MuiFab-root").contains("Reviews").click()
        cy.get(".MuiTableCell-body").contains("Full Review").click()
        cy.url().should("include", "/reviews/")
        
    });

  });
});