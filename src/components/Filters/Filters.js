import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/dist/css/splide-core.min.css";

function Filters({ movies, setFilteredMovies }) {
    const [filters, setFilters] = useState({
      searchQuery: '',
      selectedGenre: '',
      selectedTime: '',
      selectedActor: ''
    });
  
    // Фільтрація даних
    const handleFilterChange = (filterKey, value) => {
      setFilters(prevFilters => {
        const updatedFilters = { ...prevFilters, [filterKey]: value };
        applyFilters(updatedFilters);
        return updatedFilters;
      });
    };
  
    const applyFilters = (filters) => {
      let filteredMovies = movies;
  
      if (filters.searchQuery) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.filmName?.toLowerCase().includes(filters.searchQuery.toLowerCase())
        );
      }
  
      if (filters.selectedGenre) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.genres?.some(genre => genre.name === filters.selectedGenre)
        );
      }
  
      if (filters.selectedTime) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.sessions?.some(session => session?.startTime?.split('T')[1] === filters.selectedTime)
        );
      }
  
      if (filters.selectedActor) {
        filteredMovies = filteredMovies.filter(movie =>
          movie.actors?.some(actor => actor.name === filters.selectedActor)
        );
      }
  
      setFilteredMovies(filteredMovies);
    };
  
    // Функція для отримання унікальних значень для жанрів, акторів та часу
    const getUniqueValues = (array, key) => {
      const values = [];
      array.forEach(item => {
        if (item[key]) {
          item[key].forEach(value => {
            if (!values.includes(value.name)) {
              values.push(value.name);
            }
          });
        }
      });
      return values;
    };
  
    return (
      <div className="filters">
        <div className="filter__search">
          <input
            type="text"
            id="search"
            placeholder="Знайти"
            value={filters.searchQuery}
            onChange={e => handleFilterChange('searchQuery', e.target.value)}
          />
          {/* <img src={Search} alt="search" className="loop" /> */}
  
        </div>
        <div className="filter__container">
          <select
            id="genre-filter"
            value={filters.selectedGenre}
            onChange={e => handleFilterChange('selectedGenre', e.target.value)}
          >
            <option value="">Жанр</option>
            {getUniqueValues(movies, 'genres').map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            id="time-filter"
            value={filters.selectedTime}
            onChange={e => handleFilterChange('selectedTime', e.target.value)}
          >
            <option value="">Час</option>
            {movies.map((movie, index) => (
              movie.sessions?.map((session, sessionIndex) => (
                <option key={`${index}-${sessionIndex}`} value={session?.startTime?.split('T')[1]}>
                  {session?.startTime?.split('T')[1]}
                </option>
              ))
            ))}
          </select>
          <select
            id="actor-filter"
            value={filters.selectedActor}
            onChange={e => handleFilterChange('selectedActor', e.target.value)}
          >
            <option value="">Актор</option>
            {getUniqueValues(movies, 'actors').map((actor, index) => (
              <option key={index} value={actor}>
                {actor}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

export default Filters;
