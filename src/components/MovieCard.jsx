import React from "react";
import { Link } from "react-router";
import { Card } from "flowbite-react";

const MovieCard = ({ movie }) => {
  return (
    <div>
      <Link to={`/movies/details/${movie.id}`}>
        <div className="max-w-sm">
          <Card
            className="bg-white shadow-lg"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          >
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {movie.original_title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {movie.overview.slice(0, 100)}
            </p>
            <div>
              <span className="bg-black text-white text-sm p-2 rounded-xl me-2">
                <i className="fa-solid fa-star me-1" style={{color:"orange"}}></i>
                {movie.vote_average}
              </span>
              <span className="bg-black text-white text-sm	 p-2 rounded-xl">
                <i className="fa-solid fa-calendar-days me-1" style={{color:"#00d4ff"}}></i>
                {movie.release_date}
              </span>
            </div>
          </Card>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
