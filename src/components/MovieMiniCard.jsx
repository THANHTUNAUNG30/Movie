import { Card } from "flowbite-react";
import React, { useEffect } from "react";
import { api, api_key } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/action/movies";

const MovieMiniCard = () => {
  const dispatch = useDispatch();
  let movies = useSelector((state) => state.movies.movies);

  const getPopularMovie = async () => {
    try {
      const response = await api.get(`/movie/top_rated?api_key=${api_key}`);
      dispatch(fetchMovies(response.data.results));
    } catch (e) {
      console.error("Fail to fetch movies", e);
    }
  };

  useEffect(() => {
    getPopularMovie();
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-xl font-bold mb-4">Top Rated</h2>

      {/* Cards container with grid layout for 8 cards in a row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Card
              key={movie.id}
              className="w-[150px] h-[240px] bg-white shadow-lg rounded-md overflow-hidden cursor-pointer transition-all hover:scale-105"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <h5 className="text-sm font-bold tracking-tight text-gray-900 text-center mt-2">
                {movie.title}
              </h5>
            </Card>
          ))
        ) : (
          <div className="flex justify-center col-span-full mt-24 mb-24">
            <button
              disabled
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Loading...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieMiniCard;
