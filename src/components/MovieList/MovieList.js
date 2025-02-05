import React from "react";
import { Link } from "react-router-dom";
import "./MovieList.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";



const MovieList = ({ movies = [] }) => {
  if (!movies || movies.length === 0) {
    return <p>Фільми не знайдено.</p>;
  }

  return (
    <div className="movie-list">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={40}
        slidesPerView={4}
        loop={true}
        navigation={false}
        pagination={{ clickable: false }}
        breakpoints={{
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 3 },
          480: { slidesPerView: 2 },
          400: { slidesPerView: 1 },

        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <Link to={`/movies/${movie.id}`} className="movie-list__card">
              <img
                src={movie.posterPath}
                alt={movie.filmName}
                className="movie-list__image"
              />
            </Link>     
            <h3 className="movie-list__name">{movie.filmName}</h3>
            <div className="movie-list__rating">
                {Array(Math.round(movie.voteAverage / 2))
                  .fill("")
                  .map((_, index) => (
                    <FaStar key={index} style={{ color: "red", fontSize: "18px" }} />
                  ))}
            </div>
            <p className="move-list__genres">
                <strong>Жанр: </strong>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
