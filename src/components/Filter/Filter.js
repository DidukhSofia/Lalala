import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/splide/dist/css/splide-core.min.css";
import "./Filter.css";
import getmovie from "../../Get_All.json";
import Card from "../Card/Card";
import Filters from "../Filters/Filters";

const Filter = () => {
  const [slides, setSlides] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setMovies(getmovie.movies);
    setFilteredMovies(getmovie.movies);
  }, []);

  // Форматуємо дату для відображення
  const formatDate = (date) => date.toISOString().split("T")[0];

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString("en-EN", { day: "numeric", month: "short" });
  };

  const formatDay = (date) => {
    return date.toLocaleDateString("en-EN", { weekday: "short" });
  };

  // Генеруємо дати для слайдера
  useEffect(() => {
    const generateSlides = (daysCount) => {
      const today = new Date();
      const generatedSlides = [];
      for (let i = 0; i <= daysCount; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        generatedSlides.push({
          date: formatDate(currentDate),
          displayDate: formatDisplayDate(currentDate),
          day: formatDay(currentDate),
        });
      }
      setSlides(generatedSlides);
    };

    generateSlides(14);
  }, []);

  // Фільтрація за обраною датою
  useEffect(() => {
    if (!selectedDate) {
      setFilteredMovies(movies);
      return;
    }

    const filteredByDate = movies.filter((movie) =>
      movie.sessions?.some((session) => session.startTime.startsWith(selectedDate))
    );

    setFilteredMovies(filteredByDate);
  }, [selectedDate, movies]);

  return (
    <div className="filter">
      <Splide
        options={{
          type: "loop",
          perPage: 7,
          perMove: 1,
          arrows: true,
          pagination: false,
          gap: "0.3rem",
          width: 850,
          breakpoints: {
            1100: { perPage: 5, width: 600 },
            950: { perPage: 3, width: 400 },
            600: { perPage: 1, width: 100 },
          },
        }}
        aria-label="Календарний слайдер"
      >
        {slides.map((slide, index) => (
          <SplideSlide key={index}>
            <button
              className="filter__slide"
              onClick={() => setSelectedDate(slide.date)}
            >
              <h3 className="filter__slide-date">{slide.displayDate}</h3>
              <p className="filter__slide-day">{slide.day}</p>
            </button>
          </SplideSlide>
        ))}
      </Splide>

      {/* Передаємо фільтрацію у Filters */}
      <Filters movies={movies} setFilteredMovies={setFilteredMovies} />

      <div className="movies-list">
        {filteredMovies.map((movie, index) => (
          <Card key={index} card={movie} selectedDate={selectedDate} />
        ))}
      </div>
    </div>
  );
};

export default Filter;
