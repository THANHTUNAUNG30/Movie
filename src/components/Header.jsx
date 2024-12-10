import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useState } from "react";
import { api, api_key } from "../api";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../redux/action/movies";

const Header = () => {
  const dispatch = useDispatch();

  const [movieName, setMovieName] = useState("");

  const searchMovie = async () => {
    // console.log(movieName)
    try {
      if (movieName !== "") {
        const response = await api.get(
          `/search/movie?query=${movieName}&api_key=${api_key}`
        );
        //console.log(response.data.results);
        dispatch(fetchMovies(response.data.results));
      } else {
        const response = await api.get(`/movie/now_playing?api_key=${api_key}`);
        dispatch(fetchMovies(response.data.results));
      }
    } catch (e) {
      console.error("Fail to fetch Movies", e);
    }
  };

  return (
    <div className="shadow-sm">
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand href="/">
          <img
            src="/image/movie_logo.jpg"
            className="mr-3 h-16 sm:h-29 ms-10"
            alt="Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Movie
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <form className="max-w-md me-10">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search...."
                required
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  searchMovie();
                }}
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          <Dropdown
            arrowIcon={false}
            inline={true}
            label={
              <Avatar
                alt="User settings"
                //img=""
                className="text-white flex items-center justify-center"
                rounded={true}
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">Than Htun Aung</span>
              <span className="block truncate text-sm font-medium">
                thanhtunaung071@gmail.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" className="text-lg sm:text-xl">
            Home
          </Navbar.Link>
          <Navbar.Link href="/movies" className="text-lg sm:text-xl">
            Movies
          </Navbar.Link>
          <Navbar.Link href="/services" className="text-lg sm:text-xl">
            Services
          </Navbar.Link>
          <Navbar.Link href="/pricing" className="text-lg sm:text-xl">
            Pricing
          </Navbar.Link>
          <Navbar.Link href="/contact" className="text-lg sm:text-xl">
            Contact
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
