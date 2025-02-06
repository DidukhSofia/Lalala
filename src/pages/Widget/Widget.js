import React, { useEffect, useState } from "react";
import WidgetCard from "../../components/WidgetCard/WidgetCard";
import { useParams, useSearchParams } from "react-router-dom";
import "./Widget.css";
import Seat from "../../components/Seat/Seat";

function Widget() {
  const { movieId } = useParams(); // отримуємо movieId з URL
  const [searchParams] = useSearchParams(); // отримуємо пошукові параметри з URL
  const sessionId = searchParams.get("sessionId");
  const hallId = searchParams.get("hallId");

  const [movies, setMovies] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetch("/Get_All.json") // Запит до JSON файлу
      .then(response => response.json())
      .then(data => {
        setMovies(data.movies);
        setSessions(data.sessions);
        setSeats(data.seats);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Перевірка на наявність movieId, sessionId та hallId
  if (!movieId || !sessionId || !hallId) {
    console.log("movieId:", movieId);
    console.log("sessionId:", sessionId, "hallId:", hallId);
    return <div>Невірні параметри URL. Перевірте правильність movieId, sessionId, hallId.</div>;
  }

  // Фільтруємо сесії для поточного фільму і перевіряємо наявність
  const movieSessions = sessions.filter(session =>
    session.movieId === parseInt(movieId) && session.id === parseInt(sessionId) && session.hallId === parseInt(hallId)
  );

  // Якщо сесії для цього фільму немає
  if (movieSessions.length === 0) {
    return <div>No sessions available for this movie.</div>;
  }

  return (
    <div>
      {/* Перевірка на наявність movieId і відповідних сесій */}
      {movieId && movieSessions.length > 0 ? (
        <WidgetCard
          key={movieId}
          movieId={movieId}
          sessionId={sessionId}
          hallId={hallId}
        />
      ) : (
        Array.isArray(movies) &&
        movies.map((movie) => (
          <WidgetCard key={movie.id} movieId={movie.id.toString()} />
        ))
      )}

      <Seat
  sessionId={sessionId}
  hallId={hallId}
  seats={seats.filter(seat => 
    seat.sessionId === parseInt(sessionId) && seat.hallId === parseInt(hallId)
  )}
/>
    </div>
  );
}

export default Widget;
