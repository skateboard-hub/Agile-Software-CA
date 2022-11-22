import React,{ lazy, Suspense } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { createRoot } from 'react-dom/client';
import MoviesContextProvider from "./contexts/moviesContext";

const MoviePage = lazy(() => import("./pages/movieDetailsPage"));
const HomePage = lazy(() => import("./pages/homePage"));
const FavoriteMoviesPage = lazy(() => import("./pages/favoriteMoviesPage"));
const MovieReviewPage = lazy(() => import("./pages/movieReviewPage"));
const SiteHeader = lazy(() => import('./components/siteHeader'));
const UpcomingMoviesPage = lazy(() => import('./pages/upcomingMoviesPage'));
const AddMovieReviewPage = lazy(() => import('./pages/addMovieReviewPage'));
const PeoplePage = lazy(() => import('./pages/peoplePage'));
const PeopleDetailsPage = lazy(() => import('./pages/peopleDetailsPage'));
const TopRatedMoviesPage = lazy(() => import('./pages/topRatedMoviesPage'));
const PaginationPage = lazy(() => import("./pages/paginationPage"));


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Suspense>
          <Routes>
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/upcoming/:page" element={<UpcomingMoviesPage />} />
            <Route path="/popular/:page" element={<PeoplePage />} />
            <Route path="/peoples/:id" element={<PeopleDetailsPage />} />
            <Route path="/topRated/:page" element={<TopRatedMoviesPage />} />
            <Route path="/moviespage/:page" element={<PaginationPage />} />

          </Routes>
          </Suspense>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);

