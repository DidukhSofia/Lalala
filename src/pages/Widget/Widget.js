import React, { useEffect, useState } from "react";
import WidgetCard from "../../components/WidgetCard/WidgetCard";
import { useParams, useSearchParams } from "react-router-dom";
import "./Widget.css";
import Seat from "../../components/Seat/Seat";

function Widget() {
    const { movieId } = useParams();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("sessionId");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("/Get_All.json") // Замініть на правильний шлях до API
            .then(response => response.json())
            .then(data => setMovies(data.movies))
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    return (
        <div>
            {movieId ? (
                <WidgetCard key={movieId} movieId={movieId} sessionId={sessionId} />
            ) : (
                Array.isArray(movies) &&
                movies.map((movie) => (
                    <WidgetCard key={movie.id} movieId={movie.id.toString()} />
                ))
            )}

            <Seat />
        </div>
    );
}

export default Widget;
