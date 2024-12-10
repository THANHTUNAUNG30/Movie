import { Card } from "flowbite-react";
import React, { useEffect } from "react";
import Aboutus from "./Aboutus";
import { useParams } from "react-router";
import { api, api_key } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedMovie, selectedMovie } from "../redux/action/movies";

const Movie_Details = () => {
  const dispatch = useDispatch();

  // const {movie_id} = useParams();
  const params = useParams();
  const movie_id = params.movie_id;

  // console.log(movie_id);

  let movie = useSelector((state) => state.movies.movie);
  //console.log(movie);

  const getMovieDetails = async () => {
    try {
      const response = await api.get(`/movie/${movie_id}?api_key=${api_key}`);
      dispatch(selectedMovie(response.data));
      //console.log(response.data);
    } catch (e) {
      console.error("Failed to fetch movie_details:", e);
    }
  };

  useEffect(() => {
    //getMovieDetails();
    if (movie_id) {
      getMovieDetails();
    }
    return () => dispatch(removeSelectedMovie({}));
  }, []);

  return (
    <div className="my-10">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-[800px] px-4">
          <a
            href="/movies"
            className="flex items-center justify-center w-[200px] space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150"
            title="Return Home"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span>Return to Movies</span>
          </a>
          {JSON.stringify(movie) === "{}" ? (
            <div className="flex justify-center items-center h-64">
              <button
                disabled
                type="button"
                className="w-[200px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Loading...
              </button>
            </div>
          ) : (
            <div className="mt-5">
              <Card
                className="bg-white shadow-lg"
                imgAlt="Movie poster"
                imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              >
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {movie.original_title}
                </h3>
                <h5 className="text-m font-bold tracking-tight text-gray-900 dark:text-white">
                  {movie.tagline}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {movie.overview}
                </p>
                <div className="flex flex-wrap">
                  <span className="bg-black text-white m-2 p-2 rounded-xl me-2">
                    <i
                      className="fa-solid fa-star me-1"
                      style={{ color: "orange" }}
                    ></i>
                    {movie.vote_average}
                  </span>
                  <span className="bg-black text-white m-2 p-2 rounded-xl me-2">
                    <i
                      className="fa-solid fa-calendar-days me-1"
                      style={{ color: "#00d4ff" }}
                    ></i>
                    {movie.release_date}
                  </span>
                  <span className="bg-black text-white m-2 p-2 rounded-xl me-2">
                    <i
                      className="fa-solid fa-language me-1"
                      style={{ color: "#6582e3" }}
                    ></i>
                    {movie.original_language}
                  </span>
                  <span className="bg-black text-white m-2 p-2 rounded-xl me-2">
                    <i
                      className="fa-solid fa-eye me-1"
                      style={{ color: "#634e34" }}
                    ></i>
                    {movie.vote_count}
                  </span>
                  <span className="bg-black text-white m-2 p-2 rounded-xl me-2">
                    <i
                      className="fa-solid fa-building me-1"
                      style={{ color: "#E50914" }}
                    ></i>
                    {movie.production_companies[0].name}
                  </span>
                  <span className="bg-black text-white m-2 p-2 rounded-xl me-2">
                    <i
                      className="fa-solid fa-globe me-1"
                      style={{ color: "#f4d03f" }}
                    ></i>
                    {movie.production_countries[0].name}
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Aboutus />
    </div>
  );
};

export default Movie_Details;
