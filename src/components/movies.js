import React, { useEffect, useState } from "react";

const MovieList = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
 
  // trailer code

  const handlePosterClick = (movie) => {
    window.open(movie, '_blank');
  };


  // search function
  const handleSearch = () => {
    const searchedmovies = filtered.filter((item) =>
      item.Title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(searchedmovies);
    console.log(search);
  };
  // submit function

  const handleSubmit = () => {
    const filter = movies.filter((item) => {
      if (!startDate || !endDate) {
        return true;
      } else {
        const releaseDate = new Date(item.Released);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return releaseDate >= start && releaseDate <= end;
      }
    });
    setFiltered(filter);
  };

  // fetching data from Api
  const getdata = () => {
    fetch(
      "https://raw.githubusercontent.com/gaddechiranjeevi/jsonfile/main/moviesApi"
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFiltered(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <div className="headsection">
        <div>
          From{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />{" "}
          To{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />{" "}
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <br />
        <div>
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div>
        {filtered.map((movie) => {
          return (
            <div className="card">
              <div className="movie" key={movie.Title}>
                <p>
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    width="145px"
                    height="200px"
                    onClick={() => handlePosterClick(movie.Trailer)}
                  />
                </p>
                <p className="movietitle">{movie.Title}</p>
                <p>
                  <span>{movie.Year}</span> {movie.Runtime}
                </p>
                <p className="date">{movie.Released}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
