import React from "react";
import "./Card.css";

const Card = ({ card }) => {
  return (
    <div className="movie-card">
        <div className="movie__content-box">
            <img
                src={card.posterPath} // Шлях до зображення
                alt={card.filmName}
                className="movie-poster"
            />
            <div className="movie__content-text">
                <div className="movie-details">
                    <h2 className="movie-title">{card.filmName}</h2>
                    <div className="movie-rating">Rating: {card.voteAverage}</div>
                    <p className="movie-genres">
                        Genres: {card.genres.map((g) => g.name).join(", ")}
                    </p>
                    <p className="movie-actors">
                        Actors: {card.actors.map((a) => a.name).join(", ")}
                    </p>
                    <button className="movie-info-button">More info</button>
                </div>

                <div className="movie-sessions">
                {card.sessions.map((session, index) => (
                    <span key={index} className="session-time">
                    {new Date(session.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                    </span>
                ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Card;
