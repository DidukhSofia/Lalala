import React from "react";
import WidgetCard from "../../components/WidgetCard/WidgetCard";
import getmovie from "../../Get_All.json";
import { useParams, useSearchParams } from "react-router-dom";
import "./Widget.css";
// import Seats from "../../components/Seats/Seats";



function Widget() {
    const { movieId } = useParams();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("sessionId");

    return (
        <div>
            {movieId ? (
                <WidgetCard key={movieId} movieId={movieId} sessionId={sessionId} />
            ) : (
                Array.isArray(getmovie.movies) &&
                getmovie.movies.map((movie) => (
                    <WidgetCard key={movie.id} movieId={movie.id.toString()} />
                ))
            )}

            {/* <Seats/> */}
        </div>
    );
}

export default Widget;
