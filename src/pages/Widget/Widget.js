import React from "react";
import WigdetCard from "../../components/WidgetCard/WidgetCard"
import "./Widget.css"
import getmovie from "../../Get_All.json"
function Widget(){
    return(
        <div>
        {Array.isArray(getmovie.movies) && getmovie.movies.map((movie) => (
          <WigdetCard key={movie.id} widgetCard={movie} />
        ))}
        </div>
    );
}
export default Widget